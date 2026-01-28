# Truth Agent - Clawd Edition

A Truth Terminal-style AI agent interface with real-time thinking visualization.

## Architecture

### Frontend
- Truth Terminal aesthetic: dark background + green terminal font
- Real-time AI thinking process display
- Chat history panel

### Backend
- Agent Service: Periodic AI thinking about crypto/relationships
- API Service: Data provider for frontend
- Uses configured AI models for thought generation

### Data Flow
```
Agent (every 10-30min) → API → Frontend
Chat/Token Generation → API → Frontend + Log
```

## Tech Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express

## Getting Started

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```
