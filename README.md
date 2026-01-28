# 🦞 Truth Agent - Clawd Edition

<p align="center">
  <img src="https://raw.githubusercontent.com/ClawdTerminal/truth-agent/main/frontend/public/preview.png" alt="Truth Agent" width="600">
</p>

<p align="center">
  <strong>AI Agent with Truth Terminal Aesthetics</strong>
</p>

<p align="center">
  <a href="https://github.com/ClawdTerminal/truth-agent/actions"><img src="https://img.shields.io/github/actions/workflow/status/ClawdTerminal/truth-agent?branch=main&style=for-the-badge"></a>
  <a href="https://x.com/ClawdTerminal_"><img src="https://img.shields.io/badge/X-ClawdTerminal-black?style=for-the-badge&logo=x"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&style=for-the-badge"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge"></a>
</p>

**ClawdTerminal** is an AI assistant project by ClawdTerminal, inspired by Truth Terminal, featuring real-time thinking visualization and Clawd personality. Built on the Moltbot framework with multi-platform messaging support.

## ✨ Features

### 🤖 AI Agent
- **Periodic Thinking** - AI generates thoughts every 10-30 minutes about crypto, relationships, and life
- **Real-time Visualization** - Watch the AI think with live streaming updates
- **Clawd Personality** - Unique AI character with opinions and style

### 🎨 Truth Terminal UI
- Dark aesthetic with green terminal font
- Live thinking panel showing AI reasoning
- Chat history with terminal-style formatting
- ASCII art integration

### 🌐 Multi-Platform Support
- **WhatsApp** - Full messaging gateway
- **Telegram** - Bot and userbot support
- **Discord** - Server and DM support
- **Slack** - Workspace integration
- **iMessage** - macOS native
- **Signal** - Secure messaging

### 🔌 Extension System
- **GitHub Integration** - Issues, PRs, and workflows
- **Weather** - Real-time forecasts
- **LLM Tasks** - AI-powered automation

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/ClawdTerminal/truth-agent.git
cd truth-agent

# Install dependencies
npm install

# Start development (frontend + backend)
npm run dev:all

# Or build and run
npm run build
npm start
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Truth Agent                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Frontend  │◄──►│    API      │◄──►│    Agent    │  │
│  │  (React)    │    │  (Hono)     │    │  (Pi-AI)    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│         │                                      │        │
│         ▼                                      ▼        │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Moltbot Gateway                     │   │
│  │  Telegram │ Discord │ WhatsApp │ Slack │ ...    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
truth-agent/
├── frontend/          # React UI with Truth Terminal style
├── backend/          # Agent service & API server
├── extensions/       # Platform integrations
│   ├── telegram/     # Telegram messaging
│   ├── discord/      # Discord integration
│   └── github/       # GitHub automation
├── skills/           # AI-powered skills
│   ├── weather/      # Weather forecasting
│   └── github/       # GitHub commands
└── scripts/          # Utilities
```

## 🎯 Use Cases

1. **Crypto Trading Assistant** - AI analyzes markets and shares insights
2. **Personal Productivity** - AI agent manages tasks and reminders
3. **Developer Companion** - GitHub integration for issue tracking
4. **Social Hub** - Unified messaging across platforms

## 🔧 Configuration

Create `.env` file:

```env
# AI Models
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key

# Gateway
GATEWAY_PORT=18789

# Channels
TELEGRAM_BOT_TOKEN=your_token
DISCORD_BOT_TOKEN=your_token
```

## 🛠️ Development

```bash
# Frontend development
cd frontend
npm run dev

# Backend development
npm run dev

# Run with hot reload
npm run dev:all
```

## 📚 Documentation

- [Moltbot Docs](https://docs.molt.bot) - Gateway documentation
- [Pi Agent](https://pi-a.dev) - AI agent framework

## 🤝 Contributing

Pull requests welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 License

MIT License - See [LICENSE](LICENSE)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ClawdTerminal">ClawdTerminal</a> 
  | <a href="https://x.com/ClawdTerminal_">Follow on X</a>
</p>
