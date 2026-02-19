# OpenClaw User Guide

<p align="center">
  <img src="assets/gold-claw.svg" alt="OpenClaw" width="160"/>
</p>

<p align="center"><em>Your personal AI — on every channel, for free.</em></p>

---

OpenClaw is a personal AI assistant that lives in your own infrastructure and talks to you through the messaging apps you already use — WhatsApp, Telegram, Slack, Discord, iMessage, and more. This guide covers everything you need to know to get the most out of it.

## Table of Contents

1. [Your First Conversation](#1-your-first-conversation)
2. [Supported Channels](#2-supported-channels)
3. [Chat Commands](#3-chat-commands)
4. [AI Models — Choosing & Switching](#4-ai-models--choosing--switching)
5. [Skills — Extending the Assistant](#5-skills--extending-the-assistant)
6. [Sessions & Memory](#6-sessions--memory)
7. [Sending Messages & Files](#7-sending-messages--files)
8. [Voice Features](#8-voice-features)
9. [Groups & Multi-User](#9-groups--multi-user)
10. [Automation — Cron & Webhooks](#10-automation--cron--webhooks)
11. [Security & Privacy](#11-security--privacy)
12. [Tips & Power-User Tricks](#12-tips--power-user-tricks)

---

## 1. Your First Conversation

Once the gateway is running, send a message to your connected bot:

```
You: Hello! What can you do?
```

The assistant will introduce its capabilities. Here are some things to try right away:

```
You: Summarize the news today
You: Write a Python script that sorts a CSV by date
You: What's the weather in Tokyo?
You: Remind me to call John at 3pm
You: Search the web for the latest iPhone release
```

If you're using the CLI:

```bash
openclaw agent --message "Explain quantum entanglement in simple terms"
```

---

## 2. Supported Channels

<p align="center">
  <img src="assets/gold-claw.svg" width="50" style="vertical-align:middle"/>
</p>

OpenClaw works natively on all of these. Just set up the bot token and start chatting:

| Channel | DM | Groups | Voice | Setup |
|---|---|---|---|---|
| **Telegram** | ✅ | ✅ | — | [SETUP.md#telegram](SETUP.md#telegram) |
| **Discord** | ✅ | ✅ | — | [SETUP.md#discord](SETUP.md#discord) |
| **Slack** | ✅ | ✅ | — | [SETUP.md#slack](SETUP.md#slack) |
| **WhatsApp** | ✅ | ✅ | — | [SETUP.md#whatsapp](SETUP.md#whatsapp) |
| **iMessage** (BlueBubbles) | ✅ | ✅ | — | Docs |
| **Google Chat** | ✅ | ✅ | — | Docs |
| **Signal** | ✅ | ✅ | — | Docs |
| **Microsoft Teams** | ✅ | ✅ | — | Docs |
| **Matrix** | ✅ | ✅ | — | Docs |
| **WebChat** | ✅ | — | — | Built-in |
| **macOS** (menu bar) | ✅ | — | ✅ | App |
| **iOS** | ✅ | — | ✅ | App |
| **Android** | ✅ | — | ✅ | App |

### Pairing (security)

By default, OpenClaw only responds to **approved** contacts. When an unknown contact messages your bot, they get a pairing code:

```
Unknown: Hi
Bot: Please send the pairing code to connect. Code expires in 10 minutes.
```

Approve them from your terminal:

```bash
openclaw pairing list
openclaw pairing approve telegram abc123
```

Or approve via Telegram/Discord: `/approve abc123` (from an already-approved account).

---

## 3. Chat Commands

These commands work in **any connected channel** — just send them as messages:

### Session management

| Command | What it does |
|---|---|
| `/status` | Show current model, token count, and cost |
| `/new` or `/reset` | Start a fresh conversation (clears context) |
| `/compact` | Summarize and compress the current session to save context |
| `/history` | Show recent conversation history |

### Model & reasoning

| Command | What it does |
|---|---|
| `/think off` | Disable extended reasoning (faster, cheaper) |
| `/think low` | Light reasoning pass |
| `/think medium` | Balanced reasoning |
| `/think high` | Deep reasoning (best for complex problems) |
| `/think xhigh` | Maximum reasoning (slowest, most thorough) |
| `/model` | Show current model |
| `/model groq/llama-3.3-70b-versatile` | Switch to a specific model |

### Output control

| Command | What it does |
|---|---|
| `/verbose on` | Show detailed step-by-step output |
| `/verbose off` | Concise responses only |
| `/usage tokens` | Show token usage after each reply |
| `/usage full` | Show full cost + token breakdown |
| `/usage off` | Hide usage stats |

### Gateway (owner only)

| Command | What it does |
|---|---|
| `/restart` | Restart the gateway |
| `/reload` | Reload configuration without restart |

### Groups (owner only)

| Command | What it does |
|---|---|
| `/activation mention` | Bot only responds when @mentioned |
| `/activation always` | Bot responds to every message |
| `/approve <code>` | Approve a pairing request |

---

## 4. AI Models — Choosing & Switching

<p align="center">
  <img src="assets/gold-claw.svg" width="40" style="vertical-align:middle"/>
  <strong> Free models available out of the box</strong>
</p>

### Viewing available models

```bash
# See all configured models and their status
openclaw models list

# Filter by provider
openclaw models list --provider groq
openclaw models list --provider google
```

### Switching models in chat

```
/model groq/llama-3.3-70b-versatile
/model groq/deepseek-r1-distill-llama-70b
/model google/gemini-2.0-flash
/model cerebras/llama-3.3-70b
```

### Free models at a glance

| Model | Provider | Best for | Context |
|---|---|---|---|
| `llama-3.3-70b-versatile` | **Groq** | General tasks, coding | 128k |
| `llama-3.1-8b-instant` | **Groq** | Fast responses, simple tasks | 128k |
| `llama-4-scout-17b-16e-instruct` | **Groq** | Multimodal (images + text) | 131k |
| `deepseek-r1-distill-llama-70b` | **Groq** | Complex reasoning, math | 128k |
| `qwen-qwq-32b` | **Groq** | Long reasoning chains | 128k |
| `gemini-2.0-flash` | **Google** | Fast + multimodal | 1M |
| `gemini-2.0-flash-thinking` | **Google** | Reasoning + images | 1M |
| `llama-3.3-70b` | **Cerebras** | Ultra-fast responses | 128k |
| `deepseek-r1-distill-llama-70b` | **Cerebras** | Fast reasoning | 128k |

### Automatic failover

If you set multiple provider keys, OpenClaw automatically fails over when a model is unavailable or rate-limited:

```bash
# Set multiple keys for failover
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=AIzaSy...
CEREBRAS_API_KEY=csk_...
```

---

## 5. Skills — Extending the Assistant

Skills add new capabilities to the assistant. OpenClaw ships with **50+ bundled skills**.

### Browse available skills

```bash
openclaw skills list
```

### Install a skill

```bash
openclaw skills install weather
openclaw skills install brave-search
openclaw skills install github
```

### Popular bundled skills

| Skill | What it adds |
|---|---|
| `weather` | Real-time weather for any city |
| `brave-search` | Live web search via Brave API |
| `github` | Read/write GitHub issues, PRs, repos |
| `coding-agent` | Autonomous code generation + execution |
| `notion` | Read/write Notion pages and databases |
| `spotify-player` | Control Spotify playback |
| `obsidian` | Read/write Obsidian vault |
| `openai-image-gen` | Generate images with DALL·E |
| `openai-whisper` | Transcribe audio to text |

### Using skills in chat

Once installed, skills are available as tools the AI can call automatically:

```
You: What's the weather in Paris this weekend?
Bot: [calls weather skill] → 14°C, partly cloudy on Saturday...

You: Search the web for "OpenAI GPT-5 release date"
Bot: [calls brave-search skill] → Here's what I found...

You: Create a GitHub issue in my repo for the login bug we discussed
Bot: [calls github skill] → Created issue #42 "Fix login bug"...
```

### ClawHub — community skills

Browse community-contributed skills at **https://clawhub.com**:

```bash
openclaw skills search <keyword>
openclaw skills install clawhub/<skill-name>
```

---

## 6. Sessions & Memory

### How sessions work

Each contact (or channel) gets its own **session** — a persistent conversation context. The AI remembers everything within a session.

- **DM sessions**: one per contact (e.g., your Telegram, your Slack DM)
- **Group sessions**: one per group chat
- **Named sessions**: create isolated sessions for different projects

### Manage sessions

```bash
# List all active sessions
openclaw sessions list

# Send to a specific session
openclaw sessions send --session main --message "What were we discussing?"

# View session history
openclaw sessions history --session main --limit 50
```

### Session commands in chat

```
/reset          → start fresh (clears context)
/compact        → summarize and compress (keeps key facts, frees space)
/status         → see token count (approaching limit? compact first)
```

### Memory tips

- OpenClaw uses a **sliding window** — old messages are pruned when context fills up
- Use `/compact` before starting a new topic to free up space without losing continuity
- The AI remembers things **within** a session but not **across** sessions after a `/reset`

---

## 7. Sending Messages & Files

### From the CLI

```bash
# Send a text message to a channel
openclaw message send --to telegram:+1234567890 --message "Hello!"

# Send a file
openclaw message send --to slack:#general --file report.pdf

# Send to multiple channels at once
openclaw message send --to telegram,slack,discord --message "Broadcast!"
```

### From chat

Just send files directly to your bot — the AI will read, summarize, or analyze them:

- **Images**: the AI describes or analyzes them (with multimodal models like Gemini or Llama 4)
- **PDFs**: the AI reads and summarizes the content
- **Code files**: the AI reviews, explains, or improves the code
- **Audio**: transcribed and processed (with Whisper skill)

### From the agent (autonomous)

```bash
# Run an autonomous task
openclaw agent --message "Read the attached report and summarize the key metrics" \
               --file report.pdf \
               --deliver telegram:+1234567890
```

---

## 8. Voice Features

Voice requires the macOS app, iOS node, or Android node.

### macOS — Voice Wake

The macOS menu bar app supports **always-on voice activation**:

1. Open OpenClaw.app → Preferences → Voice
2. Set a wake word (e.g., "Hey Claude")
3. Speak — the assistant listens and responds via text-to-speech

### Talk Mode (push-to-talk overlay)

A floating overlay for continuous voice conversation:

1. Press the keyboard shortcut (default: `⌘⇧Space`)
2. Speak your message
3. Release — the assistant responds aloud

### iOS / Android nodes

Pair your phone as a **voice node**:

```bash
openclaw nodes pair --platform ios
```

Then tap the node widget on your phone to start voice conversations.

### TTS (text-to-speech) options

| Service | Free? | Quality | Setup |
|---|---|---|---|
| Edge TTS (built-in) | ✅ Yes | Good | No key needed |
| ElevenLabs | Freemium | Excellent | `ELEVENLABS_API_KEY` |
| Deepgram | Freemium | Very good | `DEEPGRAM_API_KEY` |

---

## 9. Groups & Multi-User

### Activation modes

In group chats, control when the bot responds:

| Mode | Behavior | How to set |
|---|---|---|
| `mention` | Only responds when @mentioned | `/activation mention` |
| `always` | Responds to every message | `/activation always` |

```
# In a group chat:
@YourBot What's the weather today?    ← triggers in 'mention' mode
```

### Agent routing

Route different channels to different AI agents with different personalities or models:

```json
// openclaw.json
{
  "channels": {
    "telegram": {
      "agent": "work-agent",
      "model": "groq/llama-3.3-70b-versatile"
    },
    "discord": {
      "agent": "gaming-agent",
      "model": "groq/llama-3.1-8b-instant"
    }
  }
}
```

### Allowlists

Control who can talk to your bot:

```json
{
  "channels": {
    "telegram": {
      "dmPolicy": "pairing",
      "allowFrom": ["+1234567890", "+0987654321"]
    }
  }
}
```

---

## 10. Automation — Cron & Webhooks

### Scheduled messages (cron)

Ask the AI to schedule recurring tasks:

```
You: Every morning at 8am, give me a summary of the weather and my tasks for the day
Bot: I'll set up a daily briefing at 8:00 AM...
```

Or configure directly:

```json
// openclaw.json
{
  "cron": [
    {
      "schedule": "0 8 * * *",
      "message": "Morning briefing: weather + tasks",
      "deliver": "telegram:me"
    }
  ]
}
```

### Webhooks

Trigger the assistant via HTTP:

```bash
# Send a webhook
curl -X POST http://localhost:18789/webhook/my-hook \
     -H "Authorization: Bearer $OPENCLAW_GATEWAY_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"message": "New order received: #12345"}'
```

Configure in `openclaw.json`:

```json
{
  "webhooks": {
    "my-hook": {
      "deliver": "slack:#orders",
      "systemPrompt": "You receive order notifications. Summarize them concisely."
    }
  }
}
```

### Gmail integration

Automatically process emails via Gmail Pub/Sub — see [Automation docs](https://docs.openclaw.ai/automation/gmail-pubsub).

---

## 11. Security & Privacy

<p align="center">
  <img src="assets/gold-claw.svg" width="40" style="vertical-align:middle"/>
  <strong> Your data never leaves your infrastructure</strong>
</p>

### What OpenClaw stores

- **Sessions**: conversation history (stored in `~/.openclaw/`)
- **Auth profiles**: encrypted API keys and OAuth tokens
- **Workspace**: agent workspaces, files, and state
- **No telemetry**: OpenClaw does not phone home

### What goes to AI providers

When you send a message, it is sent to whichever AI provider you've configured (Groq, Gemini, etc.) for inference. Choose providers whose privacy policies you're comfortable with.

### Gateway authentication

```bash
# Always set a strong gateway token
OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)
```

Without a token, the gateway is open to anyone on the network.

### DM pairing (default-secure)

By default, unknown contacts get a pairing code challenge — they can't use your bot without your approval. This is the recommended setting.

```bash
# Check current DM policies
openclaw doctor
```

### Running securely on a VPS

- Bind the gateway to loopback (`--bind loopback`) and use **Tailscale Serve** or SSH tunneling for remote access
- Use `OPENCLAW_GATEWAY_TOKEN` for authentication
- Run as a non-root user (the Docker image already does this)

---

## 12. Tips & Power-User Tricks

### Multi-step reasoning

For complex problems, enable high thinking:

```
/think high
You: Analyze this codebase architecture and suggest refactors that improve performance without breaking API compatibility
```

### Streaming long responses

Long responses stream in real time on supported channels (Telegram, Discord, WebChat). You'll see the AI "typing" as it generates.

### Code execution

With the `coding-agent` skill, the AI can write **and run** code:

```
You: Write a Python script to analyze this CSV and plot a bar chart, then run it and show me the output
Bot: [writes script, executes it, returns the chart image]
```

### Pipe CLI output to the AI

```bash
# Analyze logs
cat /var/log/nginx/error.log | openclaw agent --message "Summarize the errors"

# Review a git diff
git diff HEAD~1 | openclaw agent --message "Review this diff and flag potential bugs"

# Debug a failing command
./broken-script.sh 2>&1 | openclaw agent --message "Why is this failing and how do I fix it?"
```

### Context management

```bash
/status          # how much context is left?
/compact         # free up space while preserving continuity
/new             # start completely fresh
```

### Multiple AI providers = automatic failover

Configure 2–3 free providers. If Groq hits its rate limit, OpenClaw automatically switches to Gemini or Cerebras:

```bash
GROQ_API_KEY=gsk_...
GEMINI_API_KEY=AIzaSy...
CEREBRAS_API_KEY=csk_...
```

### Agent-to-agent communication

Have sessions communicate with each other:

```bash
openclaw sessions send --session work --message "What's the status of the project?"
```

Or in chat: `sessions_send work "Give me the project status"`

### Canvas (macOS / iOS)

The AI can render interactive visual interfaces in the Canvas:

```
You: Show me a live dashboard of my server metrics in the Canvas
Bot: [renders a live updating chart in the Canvas window]
```

---

## Getting Help

- **Docs**: https://docs.openclaw.ai
- **Discord**: https://discord.gg/clawd
- **GitHub Issues**: https://github.com/openclaw/openclaw/issues
- **Doctor**: `openclaw doctor` — runs health checks on your setup
- **FAQ**: https://docs.openclaw.ai/start/faq

---

<p align="center">
  <img src="assets/gold-claw.svg" width="80"/>
  <br/>
  <em>OpenClaw — MIT License · Built for makers, tinkerers, and power users</em>
  <br/>
  <a href="https://docs.openclaw.ai">docs.openclaw.ai</a> · <a href="https://discord.gg/clawd">Discord</a> · <a href="https://clawhub.com">ClawHub</a>
</p>
