# Troubleshooting

This guide covers common local development issues.

## Blank Front Page

Check the catalog request first.

1. Start the app:

   ```powershell
   npm run dev
   ```

2. Open:

   ```text
   http://127.0.0.1:3000
   ```

3. Check the server:

   ```text
   http://localhost:3001/health
   http://localhost:3001/catalog
   ```

If `/catalog` fails, the frontend cannot render the video grid.

## Catalog Fails In Browser But Works Directly

This is usually a CORS or API base URL issue.

- Confirm `VITE_SERVER_BASE_URL` points to the server.
- Confirm the server allows the dev client origin.
- Use `http://127.0.0.1:3000` for the frontend in development.

## Vite Cache Or File Lock Errors

If Vite reports `EPERM`, `unlink`, or cache errors:

- Stop running app processes.
- Delete `.vite-cache`.
- Restart with `npm run dev`.

The Vite cache is configured outside `client/node_modules` to reduce Windows file-lock problems.

## Port Conflicts

Expected ports:

- Client: `3000`
- Server: `3001`

If either port is already in use, stop the old process or update the relevant config.

## Missing Thumbnails

Missing thumbnails should not stop the app.

- Confirm the thumbnail exists under `server/media/thumbnails`.
- Confirm the source data references the correct thumbnail filename.
- Regenerate the catalog with `npm run generate:catalog`.
- The UI should show fallback thumbnail content when images fail.

## Missing Videos

If a video does not play:

- Confirm the file exists under `server/media/videos`.
- Confirm the catalog `link` matches the filename.
- Confirm `/video?video=<filename>` returns `200`.
- Regenerate the catalog after media changes.

## Manuals Do Not Open

Manuals are served from `server/media/docs`.

- Confirm `DOCS_BASE_PATH` in `server/.env`.
- Confirm the manual file exists under the docs folder.
- Confirm the generated or static manual link maps to `/docs/<path>`.

## Dependency Problems

If dependencies drift:

```powershell
npm install
npm install --prefix client
npm install --prefix server
```

Then run:

```powershell
npm run build
npm test
```
