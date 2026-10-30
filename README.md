# X Trends Dashboard

Real-time X/Twitter sentiment analysis and AI-powered trading signals dashboard.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and powered by Grok's native X tools + the `x-trading-trends` skill.

## Features

- **Live Feed** — Recent high-signal posts about AI, NVDA, semiconductors, and related themes
- **AI Signals Panel** — Structured trading signals (ticker, direction, confidence, thesis, actions)
- **Agent Chat** — Ask about specific names (NVDA, IREN, etc.) or request a refresh
- Dark trading-terminal UI

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- Current version uses seeded real posts fetched via Grok native X tools (as of late Oct 2026 context).
- Full live streaming requires an official X API bearer token (future enhancement).
- The agent responses follow the `x-trading-trends` skill workflow.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

Not financial advice. Social sentiment is noisy.
