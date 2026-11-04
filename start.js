import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { Readable } from "node:stream";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import app from "./src/index.js";

const ENV = fileURLToPath(new URL("./.env", import.meta.url));
const DATA = fileURLToPath(new URL("./data/", import.meta.url));

async function setup() {
	if (!process.stdin.isTTY) {
		console.error("No .env yet. Copy .env.example to .env, fill it in, then run npm start again.");
		process.exit(1);
	}
	const rl = createInterface({ input: process.stdin });
	const answers = rl[Symbol.asyncIterator]();
	const ask = async (question, fallback = "") => {
		process.stdout.write(fallback ? `${question} [${fallback}]: ` : `${question}: `);
		const { value, done } = await answers.next();
		if (done) process.exit(1);
		return value.trim() || fallback;
	};
	console.log("\nFirst run. Any OpenAI-compatible API works: OpenAI, Ollama, LM Studio, DeepInfra, Groq, Together...\n");
	const url = await ask("API base URL", "https://api.openai.com/v1");
	const key = await ask("API key (blank if your server needs none)");
	let model = "";
	while (!model) model = await ask("Chat model, the prospect who answers the phone");
	const sttModel = await ask("Speech-to-text model (blank: type your lines instead of talking)");
	const ttsModel = await ask("Text-to-speech model (blank: the prospect replies in text only)");
	rl.close();
	const lines = [`CHAT_BASE_URL=${url}`, `CHAT_API_KEY=${key}`, `CHAT_MODEL=${model}`, `STT_MODEL=${sttModel}`, `TTS_MODEL=${ttsModel}`];
	writeFileSync(ENV, lines.join("\n") + "\n");
	console.log("\nSaved to .env. Edit it any time; .env.example lists every option.\n");
}

function store() {
	mkdirSync(DATA, { recursive: true });
	const file = `${DATA}store.json`;
	const items = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
	const save = () => writeFileSync(file, JSON.stringify(items));
	const live = (key) => {
		const item = items[key];
		if (item && item.expires && item.expires < Date.now()) delete items[key];
		return items[key];
	};
	return {
		async get(key, type) {
			const item = live(key);
			if (!item) return null;
			return type === "json" ? JSON.parse(item.value) : item.value;
		},
		async put(key, value, options = {}) {
			items[key] = { value, expires: options.expirationTtl ? Date.now() + options.expirationTtl * 1000 : 0 };
			save();
		},
		async delete(key) {
			delete items[key];
			save();
		},
	};
}

if (!existsSync(ENV)) await setup();
process.loadEnvFile(ENV);
const env = { ...process.env, CALLS: store() };
const port = Number(process.env.PORT) || 8787;
const address = `http://localhost:${port}`;

createServer(async (req, res) => {
	try {
		const headers = Object.entries(req.headers).filter(([name]) => !["connection", "transfer-encoding", "keep-alive"].includes(name));
		const body = req.method === "GET" || req.method === "HEAD" ? undefined : Readable.toWeb(req);
		const response = await app.fetch(new Request(`${address}${req.url}`, { method: req.method, headers, body, duplex: "half" }), env);
		res.writeHead(response.status, Object.fromEntries(response.headers));
		res.end(Buffer.from(await response.arrayBuffer()));
	} catch (error) {
		res.writeHead(500, { "content-type": "text/plain" });
		res.end(String(error?.message || error));
	}
}).listen(port, "127.0.0.1", () => {
	console.log(`Practice Cold Calling is running at ${address}`);
	if (process.env.NO_OPEN) return;
	const open = process.platform === "win32" ? `start "" "${address}"` : process.platform === "darwin" ? `open ${address}` : `xdg-open ${address}`;
	exec(open, () => {});
});
