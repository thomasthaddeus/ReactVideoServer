# Media Library

The server owns local media and documents. Keep large media files out of the client source tree.

## Expected Folders

Default folders are configured by `server/.env`:

```text
server/media/videos
server/media/thumbnails
server/media/docs
```

The server exposes them through API routes rather than letting the client read files directly.

## Videos

Videos should live under:

```text
server/media/videos
```

Catalog entries reference videos by filename through the `link` field. The client requests playback with:

```text
/video?video=<filename>
```

The server validates and resolves the requested filename before sending the file.

## Thumbnails

Thumbnails should live under:

```text
server/media/thumbnails
```

Catalog entries reference thumbnails by filename through the `thumbnail` field. The client requests thumbnails with:

```text
/thumbnail?video=<filename>
```

If a thumbnail is missing, the generated catalog marks `thumbnailAvailable` as `false`, and the UI can show fallback thumbnail content.

## Manuals And Documents

Manuals and documents should live under:

```text
server/media/docs
```

The server exposes this folder at:

```text
/docs
```

For example, a file at:

```text
server/media/docs/schematics/example.pdf
```

is served from:

```text
http://localhost:3001/docs/schematics/example.pdf
```

## Naming Guidance

- Prefer stable filenames.
- Avoid renaming files after they are referenced in source data.
- Keep video and thumbnail base names aligned when possible.
- Avoid duplicate filenames in different nested folders unless the catalog path intentionally distinguishes them.

## Path Safety

The server should resolve media paths through `server/src/services/mediaLibrary.js`. Do not add routes that directly trust arbitrary filesystem paths from the browser.
