# OpenClaw Setup Guide

<p align="center">
  <img src="assets/gold-claw.svg" alt="OpenClaw" width="160"/>
</p>

<p align="center"><em>Your AI. Your channels. Zero cost.</em></p>

---

This guide walks you from zero to a fully running OpenClaw gateway — **completely free**. No credit card required for the AI; free hosting options are included for cloud deployment.

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Get a Free AI API Key](#2-get-a-free-ai-api-key)
3. [Install OpenClaw](#3-install-openclaw)
4. [Configure Environment](#4-configure-environment)
5. [Run the Gateway](#5-run-the-gateway)
6. [Deploy to the Cloud (Free)](#6-deploy-to-the-cloud-free)
   - [Fly.io (recommended free host)](#flyio-recommended-free-host)
   - [Self-host with Docker](#self-host-with-docker)
7. [Connect a Messaging Channel](#7-connect-a-messaging-channel)
   - [Telegram](#telegram)
   - [Discord](#discord)
   - [Slack](#slack)
   - [WhatsApp](#whatsapp)
8. [Health Check & Diagnostics](#8-health-check--diagnostics)
9. [Upgrading](#9-upgrading)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | ≥ 22.12.0 | [nodejs.org](https://nodejs.org) |
| npm / pnpm / bun | any | npm comes with Node |
| Git | any | for source builds |

Check your Node version:

```bash
node --version   # must print v22.x.x or higher
```

---

## 2. Get a Free AI API Key

You only need **one** of the following. All are free with no credit card:

### Groq _(recommended — fastest free option)_

<img src="assets/gold-claw.svg" width="32" style="vertical-align:middle"/> Groq provides **6,000 free requests per day** with state-of-the-art models running at blazing speed.

1. Go to **https://console.groq.com** and sign up (Google / GitHub login supported)
2. Navigate to **API Keys** → **Create API Key**
3. Copy the key — it starts with `gsk_`

```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

**Free models included:** Llama 3.3 70B, Llama 3.1 8B, Llama 4 Scout/Maverick, DeepSeek-R1 (reasoning), QwQ-32B (reasoning), Gemma 2 9B, Mixtral 8x7B

---

### Google Gemini _(free — multimodal + image support)_

1. Go to **https://aistudio.google.com/app/apikey**
2. Click **Create API key** (uses your Google account)
3. Copy the key

```
GEMINI_API_KEY=AIzaSy...
```

**Free tier:** 15 requests/minute, 1 million tokens/minute, 1,500 requests/day

---

### Cerebras _(free — ultra-fast 2,000+ tokens/second)_

1. Go to **https://cloud.cerebras.ai** and sign up
2. Navigate to **API Keys** → **New API Key**
3. Copy the key — it starts with `csk-`

```
CEREBRAS_API_KEY=csk_xxxxxxxxxxxxxxxxxxxx
```

**Free models included:** Llama 3.3 70B, Llama 3.1 8B, DeepSeek-R1, Qwen 3 32B

---

### GitHub Copilot _(free with GitHub account)_

If you have a GitHub account, you already have access to Copilot's free tier:

1. Create a **Personal Access Token** at https://github.com/settings/tokens
2. Or use `gh auth token` if you have the GitHub CLI installed

```
GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

---

### OpenRouter _(free — access to 100+ free models)_

1. Go to **https://openrouter.ai** and sign up
2. Navigate to **Keys** → **Create Key**
3. Copy the key — it starts with `sk-or-`

```
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxx
```

**Tip:** On OpenRouter, free models use the `:free` suffix, e.g. `meta-llama/llama-3.1-8b-instruct:free`

---

### Hugging Face _(free — 100+ open models via inference router)_

1. Go to **https://huggingface.co/settings/tokens** and sign up
2. Create a **Read** token

```
HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxx
```

---

## 3. Install OpenClaw

### Option A — npm (recommended)

```bash
npm install -g openclaw@latest
```

Verify:

```bash
openclaw --version
```

### Option B — From source (for developers)

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm build
```

Then use `pnpm openclaw` instead of `openclaw`.

---

## 4. Configure Environment

Create a `.env` file (or `~/.openclaw/.env` for a daemon install):

```bash
# Copy the example
cp .env.example .env
```

Add your free API key:

```bash
# .env

# ── Required: at least one AI provider ──────────────────────────────────────

# Groq (recommended free tier — get key at https://console.groq.com)
GROQ_API_KEY=gsk_...

# OR: Google Gemini (free — https://aistudio.google.com/app/apikey)
# GEMINI_API_KEY=AIzaSy...

# OR: Cerebras (free — https://cloud.cerebras.ai)
# CEREBRAS_API_KEY=csk_...

# OR: GitHub Copilot (free with GitHub account)
# GH_TOKEN=ghp_...

# ── Gateway auth token (generate one) ───────────────────────────────────────
OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)

# ── Optional: channels ──────────────────────────────────────────────────────
# TELEGRAM_BOT_TOKEN=123456:ABCDEF...
# DISCORD_BOT_TOKEN=...
```

> **Tip:** OpenClaw auto-detects which provider to use based on which key is present. Set multiple keys to enable automatic failover.

---

## 5. Run the Gateway

### Interactive mode (try it now)

```bash
openclaw gateway --verbose
```

The gateway starts at `http://127.0.0.1:18789` by default. Open the **Control UI** at that URL.

### With onboarding wizard (recommended first run)

The wizard walks you through every configuration step:

```bash
openclaw onboard --install-daemon
```

This:
- Detects your AI provider keys
- Configures channels (Telegram, Discord, Slack…)
- Installs a background daemon (launchd on macOS, systemd on Linux)
- Runs `openclaw doctor` to validate the setup

### As a background service (Linux systemd)

```bash
# After onboard --install-daemon
systemctl --user status openclaw-gateway
```

### Test the AI

```bash
openclaw agent --message "Hello! What AI model are you running on?"
```

---

## 6. Deploy to the Cloud (Free)

### Fly.io _(recommended free host)_

<img src="assets/gold-claw.svg" width="32" style="vertical-align:middle"/> Fly.io includes a **free tier** with enough compute to run OpenClaw continuously.

**Free allowance:** 3× `shared-cpu-1x` VMs with 256 MB RAM — enough for OpenClaw's gateway.

#### Prerequisites

```bash
# Install the Fly CLI
curl -L https://fly.io/install.sh | sh

# Log in (creates account if needed — no credit card for free tier)
fly auth login
```

#### Deploy

The `fly.toml` in this repo is already pre-configured for the free tier:

```bash
# From the openclaw directory:
fly launch --config fly.toml

# Set your free AI key as a secret
fly secrets set GROQ_API_KEY=gsk_...

# Deploy
fly deploy
```

#### Check it's running

```bash
fly status
fly logs
```

Your gateway will be available at `https://openclaw.fly.dev` (or your custom app name).

#### Set a gateway token (important for security)

```bash
fly secrets set OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32)
```

#### Persistent storage

The `fly.toml` mounts a 1 GB persistent volume at `/data` so your config, sessions, and state survive deployments. This is within the free tier.

---

### Self-host with Docker

If you have any Linux machine (VPS, Raspberry Pi, home server), you can self-host for free:

```bash
# Pull and run
docker run -d \
  --name openclaw \
  --restart unless-stopped \
  -p 18789:18789 \
  -e GROQ_API_KEY=gsk_... \
  -e OPENCLAW_GATEWAY_TOKEN=$(openssl rand -hex 32) \
  -v openclaw-data:/data \
  ghcr.io/openclaw/openclaw:latest

# Check logs
docker logs -f openclaw
```

#### Using docker-compose

```bash
# Copy and edit the env
cp .env.example .env
# (edit .env — add GROQ_API_KEY and OPENCLAW_GATEWAY_TOKEN)

docker compose up -d
docker compose logs -f
```

#### Using Podman

```bash
./setup-podman.sh
```

---

## 7. Connect a Messaging Channel

### Telegram

1. Chat with **[@BotFather](https://t.me/BotFather)** on Telegram
2. Send `/newbot` and follow the prompts
3. Copy the token (format: `123456:ABCDEF...`)
4. Add to `.env`:

```bash
TELEGRAM_BOT_TOKEN=123456:ABCDEF...
```

5. Restart the gateway. Send your bot a message — it'll ask for a pairing code.
6. Approve: `openclaw pairing approve telegram <code>`

---

### Discord

1. Go to **https://discord.com/developers/applications** → **New Application**
2. Under **Bot** → **Add Bot** → copy the token
3. Enable **Message Content Intent** under **Privileged Gateway Intents**
4. Add to `.env`:

```bash
DISCORD_BOT_TOKEN=...
```

5. Invite your bot to a server using the OAuth2 URL generator (scopes: `bot`, permissions: `Send Messages`, `Read Message History`)

---

### Slack

1. Go to **https://api.slack.com/apps** → **Create New App** → **From scratch**
2. Under **OAuth & Permissions** → add scopes: `chat:write`, `im:history`, `im:read`
3. Install to workspace → copy **Bot User OAuth Token** (`xoxb-...`)
4. Under **App-Level Tokens** → generate a token with `connections:write` scope
5. Add to `.env`:

```bash
SLACK_BOT_TOKEN=xoxb-...
SLACK_APP_TOKEN=xapp-...
```

---

### WhatsApp

WhatsApp requires **BlueBubbles** (for iMessage relay) or the Baileys-based extension:

```bash
# Start the WhatsApp pairing flow
openclaw channels whatsapp pair
```

Scan the QR code with WhatsApp on your phone (**Settings → Linked Devices → Link a Device**).

---

## 8. Health Check & Diagnostics

```bash
# Run the built-in doctor
openclaw doctor

# Gateway health endpoint (when running)
curl http://127.0.0.1:18789/health

# Check model availability
openclaw models list

# View gateway logs
openclaw gateway --verbose
```

Common checks `doctor` performs:
- AI provider key validity
- Channel token validity
- DM policy (security)
- Gateway connectivity
- Disk space

---

## 9. Upgrading

```bash
# Update to latest stable
openclaw update

# Or via npm
npm install -g openclaw@latest

# Verify
openclaw --version
openclaw doctor
```

---

## 10. Troubleshooting

### "No AI provider configured"

Make sure at least one key is set and exported:

```bash
echo $GROQ_API_KEY      # should not be empty
openclaw models list    # should show Groq models
```

### Gateway doesn't start

```bash
openclaw gateway --verbose --port 18790  # try a different port
# Check if port 18789 is already in use:
lsof -i :18789
```

### Channel messages not arriving

```bash
openclaw doctor          # checks channel config
openclaw gateway --verbose   # look for error lines from the channel
```

### "Unknown senders receive a pairing code"

This is the default **secure** behavior. Approve a sender:

```bash
openclaw pairing list
openclaw pairing approve telegram <code>
```

Or open to all senders (less secure):
```json
// openclaw.json
{ "channels": { "telegram": { "dmPolicy": "open" } } }
```

### Fly.io deployment fails

```bash
fly logs                    # see what went wrong
fly ssh console             # SSH into the running VM
fly status                  # check machine health
```

---

<p align="center">
  <img src="assets/gold-claw.svg" width="80"/>
  <br/>
  <em>OpenClaw — MIT License · <a href="https://docs.openclaw.ai">docs.openclaw.ai</a> · <a href="https://discord.gg/clawd">Discord</a></em>
</p>
