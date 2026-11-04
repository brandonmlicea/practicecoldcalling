# Practice Cold Calling

Dial a number, and an AI prospect picks up: rude, skeptical, interested, already covered or the ideal customer, picked at random and never told to you. Pitch them out loud, handle the objections, ask for the meeting. When you hang up, the call is graded on your opener, clarity, discovery, objection handling and close, with the one line you should have said. After two calls a coach spots the pattern across them.

It runs on your own computer with the models you choose.

## Start

Needs Node 20.12 or newer.

```sh
git clone https://github.com/brandonmlicea/practicecoldcalling
cd practicecoldcalling
npm start
```

The first run asks for an API base URL, a key and model names, saves them to `.env`, starts http://localhost:8787 and opens it. There is nothing to install: the app has no runtime dependencies.

## Models

Every model is reached through an OpenAI-compatible API, so any provider or local server that speaks it works.

| What | Endpoint | Setting | Without it |
| --- | --- | --- | --- |
| The prospect | `/chat/completions` | `CHAT_BASE_URL`, `CHAT_API_KEY`, `CHAT_MODEL` | Required |
| Your voice to text | `/audio/transcriptions` | `STT_MODEL` (and optional `STT_BASE_URL`, `STT_API_KEY`) | You type your lines |
| The prospect's voice | `/audio/speech` | `TTS_MODEL`, `TTS_VOICES_MALE`, `TTS_VOICES_FEMALE` | Replies show as text |

The speech settings reuse the chat URL and key unless you give them their own. Set `ELEVENLABS_API_KEY` to use ElevenLabs voices first. `CHAT_EXTRA` is JSON merged into every chat request, for provider-specific options. `.env.example` lists every setting.

Some setups:

```sh
# OpenAI
CHAT_BASE_URL=https://api.openai.com/v1
CHAT_MODEL=<a chat model>
STT_MODEL=whisper-1
TTS_MODEL=<a speech model>

# Ollama, fully local (text only unless you add a speech server)
CHAT_BASE_URL=http://localhost:11434/v1
CHAT_API_KEY=
CHAT_MODEL=<a model you pulled>
```

## Your data

Calls, grades and your pitch are saved in `data/store.json` on your machine. The only requests that leave it are the ones to the model providers you configure. `.env` and `data/` are ignored by git.

## Test

`npm run qa` drives the app in Chrome with the eight spoken clips in `qa/` (synthetic voices) and checks that a full turn is heard as one turn, pauses included, and that talking over the prospect cuts them off. Start the app first; `PCC_URL` points the test elsewhere and `CHROME_PATH` picks another Chrome. Install the test dependency with `npm install` first.

## Files

| Path | What |
| --- | --- |
| `start.js` | First-run setup, the local store and the server |
| `src/index.js` | The API: the call, the prospect, transcription, voices, grading and the coach |
| `src/page.js` | The page: setup, keypad, the call, the review and your hub |
| `qa/` | The turn-taking test |

## License

MIT
