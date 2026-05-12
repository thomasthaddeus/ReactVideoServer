const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { resolveMediaFile } = require('../src/services/mediaLibrary');

const rootDir = path.resolve(__dirname, '..', '..');
const sourceDataPath = path.join(rootDir, 'server', 'src', 'data', 'sourceData.js');
const mediaRoot = path.join(rootDir, 'server', 'media');
const videosPath = path.join(mediaRoot, 'videos');
const thumbnailsPath = path.join(mediaRoot, 'thumbnails');
const outputPath = path.join(rootDir, 'server', 'src', 'data', 'catalog.json');

function loadSourceData() {
  const source = fs.readFileSync(sourceDataPath, 'utf8');
  const sandbox = { module: { exports: {} }, exports: {} };

  vm.runInNewContext(source, sandbox, { filename: sourceDataPath });
  return sandbox.module.exports;
}

function getRelativeMediaPath(filePath) {
  return filePath ? path.relative(mediaRoot, filePath).replace(/\\/g, '/') : null;
}

function getMediaType(fileName = '') {
  const extension = path.extname(fileName).replace('.', '').toLowerCase();
  return extension || 'unknown';
}

function readUInt64BE(buffer, offset) {
  return Number((BigInt(buffer.readUInt32BE(offset)) << 32n) + BigInt(buffer.readUInt32BE(offset + 4)));
}

function readMp4DurationSeconds(filePath) {
  const stats = fs.statSync(filePath);
  const chunkSize = Math.min(stats.size, 16 * 1024 * 1024);
  const fd = fs.openSync(filePath, 'r');

  try {
    const startBuffer = readChunk(fd, chunkSize, 0);
    const startDuration = readMp4DurationFromBuffer(startBuffer);

    if (startDuration !== null) {
      return startDuration;
    }

    if (stats.size <= chunkSize) {
      return null;
    }

    const endBuffer = readChunk(fd, chunkSize, stats.size - chunkSize);
    return readMvhdDurationBySearch(endBuffer);
  } finally {
    fs.closeSync(fd);
  }
}

function readChunk(fd, size, position) {
  const buffer = Buffer.alloc(size);
  fs.readSync(fd, buffer, 0, size, position);
  return buffer;
}

function readMp4DurationFromBuffer(buffer) {
  let offset = 0;

  while (offset + 8 <= buffer.length) {
    const size = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const boxSize = size === 1 ? Number(readUInt64BE(buffer, offset + 8)) : size;
    const headerSize = size === 1 ? 16 : 8;

    if (!boxSize || boxSize < headerSize) {
      break;
    }

    if (type === 'moov') {
      return readMvhdDurationFromMoov(buffer, offset + headerSize, offset + boxSize);
    }

    offset += boxSize;
  }

  return readMvhdDurationBySearch(buffer);
}

function readMvhdDurationFromMoov(buffer, start, end) {
  let offset = start;

  while (offset + 8 <= end) {
    const size = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const boxSize = size === 1 ? Number(readUInt64BE(buffer, offset + 8)) : size;
    const headerSize = size === 1 ? 16 : 8;

    if (!boxSize || boxSize < headerSize) {
      break;
    }

    if (type === 'mvhd') {
      const version = buffer.readUInt8(offset + headerSize);
      const timeScaleOffset = version === 1 ? offset + headerSize + 20 : offset + headerSize + 12;
      const durationOffset = version === 1 ? offset + headerSize + 24 : offset + headerSize + 16;
      const timeScale = buffer.readUInt32BE(timeScaleOffset);
      const duration = version === 1
        ? readUInt64BE(buffer, durationOffset)
        : buffer.readUInt32BE(durationOffset);

      return timeScale > 0 ? Math.round((duration / timeScale) * 100) / 100 : null;
    }

    offset += boxSize;
  }

  return null;
}

function getDurationSeconds(filePath, mediaType) {
  if (!filePath || mediaType !== 'mp4') {
    return null;
  }

  try {
    return readMp4DurationSeconds(filePath);
  } catch {
    return null;
  }
}

function readMvhdDurationBySearch(buffer) {
  let typeOffset = buffer.indexOf('mvhd', 0, 'ascii');

  while (typeOffset >= 4) {
    const duration = readMvhdDurationAtTypeOffset(buffer, typeOffset);

    if (duration !== null) {
      return duration;
    }

    typeOffset = buffer.indexOf('mvhd', typeOffset + 4, 'ascii');
  }

  return null;
}

function readMvhdDurationAtTypeOffset(buffer, typeOffset) {
  if (typeOffset + 24 > buffer.length) {
    return null;
  }

  const version = buffer.readUInt8(typeOffset + 4);
  const timeScaleOffset = version === 1 ? typeOffset + 28 : typeOffset + 16;
  const durationOffset = version === 1 ? typeOffset + 32 : typeOffset + 20;

  if (durationOffset + (version === 1 ? 8 : 4) > buffer.length) {
    return null;
  }

  const timeScale = buffer.readUInt32BE(timeScaleOffset);
  const duration = version === 1
    ? readUInt64BE(buffer, durationOffset)
    : buffer.readUInt32BE(durationOffset);

  return timeScale > 0 ? Math.round((duration / timeScale) * 100) / 100 : null;
}

function getSectionName(subheading) {
  if (/^Section\s+\d+\s+-\s+/i.test(subheading)) {
    return subheading;
  }

  if (subheading === 'Specific') {
    return 'Specific';
  }

  return 'Courses';
}

function buildEntry(section, index) {
  const videoPath = resolveMediaFile(videosPath, section.link);
  const thumbnailPath = resolveMediaFile(thumbnailsPath, section.thumbnail);
  const mediaType = getMediaType(section.link);
  const stats = videoPath ? fs.statSync(videoPath) : null;

  return {
    id: section.link || `video-${index}`,
    subheading: section.subheading,
    section: getSectionName(section.subheading),
    course: section.subheading,
    disc_title: section.disc_title,
    title: section.disc_title || section.subheading,
    topics: section.topics || [],
    items: section.items || [],
    link: section.link,
    videoPath: getRelativeMediaPath(videoPath),
    thumbnail: section.thumbnail,
    thumbnailPath: getRelativeMediaPath(thumbnailPath),
    mediaType,
    fileSizeBytes: stats?.size || null,
    durationSeconds: getDurationSeconds(videoPath, mediaType),
    thumbnailAvailable: Boolean(thumbnailPath),
  };
}

function generateCatalog() {
  const sourceData = loadSourceData();
  const catalog = {
    title: sourceData.title,
    generatedAt: new Date().toISOString(),
    mediaRoot: 'server/media',
    sections: sourceData.sections.map(buildEntry),
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
  return catalog;
}

if (require.main === module) {
  const catalog = generateCatalog();
  console.log(`Generated ${catalog.sections.length} catalog entries at ${outputPath}`);
}

module.exports = {
  generateCatalog,
};
