# CodeSnippet

A SaaS platform that converts source code into animated vertical videos for TikTok, Reels, and YouTube Shorts.

## Quick Start

```bash
# Install dependencies
npm install

# Start web app
npm run dev:web

# Start Remotion studio
npm run dev:renderer

# Start API server
npm run dev:api
```

## Project Structure

```
/apps
  /web        → Vite + React UI
  /renderer   → Remotion compositions
/packages
  /themes     → Theme system (RevOrgs)
  /animations → Animation presets
  /utils      → Shared utilities
/server
  /api        → REST API (auth, billing, render)
```

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Monaco Editor
- **Video**: Remotion (React → Video)
- **Backend**: Node.js (ESM), Serverless-ready
- **Auth**: Email + Google OAuth
- **Payments**: Stripe

## License

MIT
