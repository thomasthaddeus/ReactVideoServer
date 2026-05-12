# Catalog Guide

The catalog is the bridge between the local media library and the React UI.

## Files

- `server/src/data/sourceData.js`: curated source list of videos and topics.
- `server/src/data/catalog.json`: generated catalog consumed by the server.
- `server/scripts/generateCatalog.js`: generator script.
- `server/src/routes/media.js`: exposes the generated catalog at `/catalog`.

## Generate The Catalog

From the repository root:

```powershell
npm run generate:catalog
```

This runs the server package script:

```powershell
npm run generate:catalog --prefix server
```

## What The Generator Does

The generator:

- Loads `server/src/data/sourceData.js`.
- Resolves videos under `server/media/videos`.
- Resolves thumbnails under `server/media/thumbnails`.
- Computes relative media paths.
- Adds metadata such as media type, file size, duration, section, course, topics, and thumbnail availability.
- Writes `server/src/data/catalog.json`.

## Catalog Entry Fields

Each generated section entry may include:

- `id`: stable identifier, usually the video filename.
- `subheading`: source grouping label.
- `section`: normalized high-level section.
- `course`: course name used by filters.
- `disc_title`: display title from source data.
- `title`: display-safe fallback title.
- `topics`: topic tags.
- `items`: extra source metadata.
- `link`: video filename requested by the client.
- `videoPath`: resolved relative path when the file exists.
- `thumbnail`: thumbnail filename requested by the client.
- `thumbnailPath`: resolved relative path when the thumbnail exists.
- `mediaType`: file extension such as `mp4`.
- `fileSizeBytes`: video size when the file exists.
- `durationSeconds`: extracted MP4 duration when available.
- `thumbnailAvailable`: whether the thumbnail was found.

## Editing Source Data

When adding or changing videos:

1. Update `server/src/data/sourceData.js`.
2. Add the video under `server/media/videos`.
3. Add the thumbnail under `server/media/thumbnails` if available.
4. Run `npm run generate:catalog`.
5. Run `npm test`.

## Known Limitations

- Duration extraction is currently lightweight and MP4-focused.
- Missing media files produce `null` metadata fields rather than failing generation.
- The client still uses static manual data separately from the video catalog.
