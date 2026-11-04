import { chromium } from "playwright-core";
import fs from "fs";

const clip = (n) => fs.readFileSync(new URL(`./${n}.wav`, import.meta.url)).toString("base64");
const CASES = [
	{ name: "one complete sentence", parts: [[1, 0]], expect: ["30 seconds"] },
	{ name: "1.1s pause mid-sentence", parts: [[2, 0], [3, 1100]], expect: ["available for a", "getting more jobs"] },
	{ name: "two sentences, 0.7s real breath", parts: [[4, 0], [5, 0]], expect: ["win more jobs", "invoices"] },
	{ name: "trailing 'and', 1.8s thinking pause", parts: [[6, 0], [7, 1800]], expect: ["back office", "every single week"] },
	{ name: "talks over the lead", barge: true, parts: [[8, 0]], expect: ["let me explain"] },
];

const URL_UNDER_TEST = process.env.PCC_URL || "http://localhost:8787";
const b = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), args: ["--disable-quic", "--use-fake-ui-for-media-stream", "--autoplay-policy=no-user-gesture-required"] });
const results = [];
for (const c of CASES) {
	const p = await b.newPage();
	await p.addInitScript(({ clips }) => {
		window.QA = { clips, said: [] };
		navigator.mediaDevices.getUserMedia = async () => {
			const ctx = new AudioContext();
			const dest = ctx.createMediaStreamDestination();
			window.QA.speak = async (parts) => {
				let at = ctx.currentTime + 0.05;
				for (const [b64, gap] of parts) {
					const bytes = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
					const buf = await ctx.decodeAudioData(bytes.buffer);
					at += gap / 1000;
					const src = ctx.createBufferSource();
					src.buffer = buf;
					src.connect(dest);
					src.start(at);
					at += buf.duration;
				}
				window.QA.endAt = performance.now() + (at - ctx.currentTime) * 1000;
				return (at - ctx.currentTime) * 1000;
			};
			return dest.stream;
		};
		new MutationObserver(() => {
			const log = document.getElementById("log");
			if (log) window.QA.said.push([performance.now(), log.children.length]);
		}).observe(document, { childList: true, subtree: true });
	}, { clips: c.parts.map(([n, gap]) => [clip(n), gap]) });
	await p.goto(URL_UNDER_TEST, { waitUntil: "domcontentloaded", timeout: 60000 });
	await p.fill("#customer", "General contractors");
	await p.fill("#pitch", "We help contractors win more jobs");
	await p.fill("#mine", "Cadena");
	await p.click('#pad button:has-text("5")');
	await p.click("#dial");
	if (c.barge) {
		await p.waitForFunction(() => document.getElementById("status").textContent.includes("talking"), null, { timeout: 40000 });
		await p.waitForTimeout(300);
	} else {
		await p.waitForFunction(() => document.getElementById("status").textContent.includes("Your turn"), null, { timeout: 40000 });
	}
	const speechMs = await p.evaluate(() => window.QA.speak(window.QA.clips));
	await p.waitForFunction(() => document.querySelectorAll("#log div").length >= 3, null, { timeout: 30000 });
	const out = await p.evaluate(() => {
		const rows = [...document.querySelectorAll("#log div")].map((d) => d.textContent);
		const replyAt = window.QA.said.find((x) => x[1] >= 3)[0];
		return { rows, gap: Math.round(replyAt - window.QA.endAt) };
	});
	const you = out.rows[1] || "";
	const ok = c.expect.every((w) => you.toLowerCase().includes(w));
	results.push({ case: c.name, fullTurnKept: ok, oneTurn: out.rows.filter((r) => r.startsWith("You:")).length === 1, replyGapMs: out.gap, you, them: out.rows[2] });
	await p.close();
}
await b.close();
for (const r of results) console.log(JSON.stringify(r));
