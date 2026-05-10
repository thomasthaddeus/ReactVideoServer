# React Video Server

React Video Server is a small full-stack app with a Vite React client and an Express media server.

## Repository Layout

```text
client/              React UI, browser-only assets, and client tests
server/src/          Express app, routes, config, and media lookup services
server/media/        Server-owned videos, thumbnails, documents, and static media
server/test/         Server route tests
scripts/media-tools/ One-off media and catalog maintenance scripts
scripts/legacy/      Archived experiments kept out of app runtime paths
```

Keep large media, generated catalogs, Python environments, and server-owned documents out of `client/src`. The client should render UI and call the server; the server should own filesystem access.

## Scripts

From the repository root:

```powershell
npm run dev
```

Runs the Express server and the Vite client together.

```powershell
npm run server
npm run client
```

Runs either side individually.

From `client`:

```powershell
npm run build
npm test
```

Builds the client and runs client tests.

From `server`:

```powershell
npm test
```

Runs server route tests.

## Environment

The root `.env` is used by Vite for `VITE_SERVER_BASE_URL`.

The server reads `server/.env`:

```text
VIDEO_BASE_PATH=media/videos
THUMBNAIL_BASE_PATH=media/thumbnails
DOCS_BASE_PATH=media/docs
PORT=3001
```

Client URL: `http://127.0.0.1:3000`

Server URL: `http://localhost:3001`
