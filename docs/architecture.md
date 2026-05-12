# Architecture

The application is split into a browser client and a filesystem-aware media server.

## Client

Location: `client/`

The client is a Vite React application. Its job is to render the user interface and call server APIs. It should not own media discovery or direct filesystem access.

Important areas:

- `client/src/App.jsx`: main application state, video grid, modal playback, search, and filtering.
- `client/src/components/`: top menu, sidebar, filters, manuals, and footer.
- `client/src/services/catalog.js`: fetches the server-owned catalog.
- `client/src/theme.js`: shared visual tokens for spacing, color, type, radius, and shadows.
- `client/src/styles.js` and `client/src/components/componentStyles.js`: Emotion styles.

## Server

Location: `server/`

The server is an Express app. It owns media paths, generated catalog data, and static document access.

Important areas:

- `server/src/index.js`: starts the HTTP server.
- `server/index.js`: exports the Express app for tests.
- `server/src/app.js`: creates the Express app, health route, CORS, static docs, and media routes.
- `server/src/routes/media.js`: `/catalog`, `/video`, and `/thumbnail` routes.
- `server/src/services/mediaLibrary.js`: validates and resolves requested media paths.
- `server/src/config.js`: reads server environment and resolves media folders.

## API Surface

### `GET /health`

Returns server health:

```json
{ "status": "ok" }
```

### `GET /catalog`

Returns the generated media catalog from `server/src/data/catalog.json`.

### `GET /video?video=<file>`

Streams a video file from the configured videos folder.

### `GET /thumbnail?video=<file>`

Returns a thumbnail image from the configured thumbnails folder.

### `GET /docs/<path>`

Serves static manuals and documents from the configured docs folder.

## Data Flow

1. `server/scripts/generateCatalog.js` reads curated source data and media folders.
2. It writes `server/src/data/catalog.json`.
3. The server exposes that catalog through `/catalog`.
4. The client fetches `/catalog`.
5. The client renders cards, filters, search, and modal playback links using server URLs.

## Responsibility Rule

The client owns presentation and interaction. The server owns local files, catalog generation, path validation, and media delivery.
