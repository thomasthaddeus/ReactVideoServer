# Development Guide

This project is a local full-stack video library made of a Vite React client and an Express server.

## Requirements

- Node.js and npm
- PowerShell 7 available as `pwsh`
- Local media folders under `server/media`

## Install

Run installs from each package location if dependencies are missing:

```powershell
npm install
npm install --prefix client
npm install --prefix server
```

## Run The App

From the repository root:

```powershell
npm run dev
```

Expected URLs:

- Client: `http://127.0.0.1:3000`
- Server: `http://localhost:3001`
- Health check: `http://localhost:3001/health`
- Catalog API: `http://localhost:3001/catalog`

The root dev command starts both the server and client. Individual commands are also available:

```powershell
npm run dev:client
npm run dev:server
```

## Environment

The client reads `VITE_SERVER_BASE_URL` from the root `.env`.

The server reads `server/.env`:

```text
VIDEO_BASE_PATH=media/videos
THUMBNAIL_BASE_PATH=media/thumbnails
DOCS_BASE_PATH=media/docs
PORT=3001
```

Paths in `server/.env` are resolved relative to the `server` directory.

## Build And Test

```powershell
npm run build
npm test
npm run ci
```

Useful targeted commands:

```powershell
npm run test:client
npm run test:server
npm run generate:catalog
```

## Local Startup Notes

The client uses Vite with a project-local cache directory configured in `client/vite.config.js`. This avoids common Windows file-lock issues under `client/node_modules/.vite`.

If startup fails after a dependency or config change:

- Stop any running Node processes for this app.
- Confirm ports `3000` and `3001` are free.
- Delete `.vite-cache` if Vite reports cache or unlink errors.
- Run `npm run dev` again.
