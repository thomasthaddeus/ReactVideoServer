const fs = require('fs');
const path = require('path');

function isInside(parent, child) {
  const relativePath = path.relative(parent, child);
  return relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
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
  if (!requestedPath) {
    return null;
  }

  const normalizedRequest = path.normalize(requestedPath);
  const directPath = path.resolve(rootDir, normalizedRequest);

  if (isInside(rootDir, directPath) && fs.existsSync(directPath)) {
    return directPath;
  }

  return findByBasename(rootDir, path.basename(normalizedRequest));
}

module.exports = {
  resolveMediaFile,
};
