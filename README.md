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
npm start
```

Runs the Express server and the Vite client together.

```powershell
npm run dev
```

Equivalent to `npm start`; useful when you want to be explicit about development mode.

```powershell
npm run dev:server
npm run dev:client
```

Runs either side individually.

```powershell
npm run clean
npm run build
npm run preview
npm test
```

Cleans generated client output, builds the client, previews the production client build, and runs the full test suite.

```powershell
npm run ci
```

Runs the local build and test checks in one command.

```powershell
npm run test:client
npm run test:server
```

Runs either test suite individually.

```powershell
npm run generate:catalog
```

Regenerates the server media catalog.

The older convenience aliases still work:

```powershell
npm run server
npm run client
```

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
