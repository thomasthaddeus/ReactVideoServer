const fs = require('fs');
const path = require('path');

const mediaFileNamePattern = /^[A-Za-z0-9][A-Za-z0-9 ._&()+-]*\.[A-Za-z0-9]+$/;

function isInside(parent, child) {
  const relativePath = path.relative(parent, child);
  return relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

function normalizeRequestedMediaPath(requestedPath) {
  if (typeof requestedPath !== 'string') {
    return null;
  }

  const fileName = requestedPath.trim();

  if (
    fileName.length === 0
    || fileName.length > 255
    || fileName.includes('\0')
    || fileName.includes('/')
    || fileName.includes('\\')
    || fileName !== path.basename(fileName)
    || !mediaFileNamePattern.test(fileName)
  ) {
    return null;
  }

  return fileName;
}

function findByBasename(rootDir, fileName) {
  const candidateNames = new Set([
    fileName,
    fileName.replace(/Disc(\d)(?=\.)/i, 'Disc0$1'),
    fileName.replace(/-Disc(\d)(?=\.)/i, '-Disc0$1'),
  ]);
  const stack = [rootDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (candidateNames.has(entry.name)) {
        return fullPath;
      }
    }
  }

  return null;
}

function resolveMediaFile(rootDir, requestedPath) {
  const fileName = normalizeRequestedMediaPath(requestedPath);

  if (!fileName) {
    return null;
  }

  const directPath = path.join(rootDir, fileName);

  if (isInside(rootDir, directPath) && fs.existsSync(directPath)) {
    return directPath;
  }

  return findByBasename(rootDir, fileName);
}

module.exports = {
  normalizeRequestedMediaPath,
  resolveMediaFile,
};
