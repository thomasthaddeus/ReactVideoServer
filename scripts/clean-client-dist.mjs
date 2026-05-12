import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname } from 'node:path';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(scriptDir, '..', 'client', 'dist');

function removeWithNode() {
  rmSync(distPath, {
    force: true,
    maxRetries: 5,
    recursive: true,
    retryDelay: 100,
  });
}

function removeWithPowerShell() {
  const escapedPath = distPath.replaceAll("'", "''");
  const command = `Remove-Item -LiteralPath '${escapedPath}' -Recurse -Force -ErrorAction Stop`;
  const shells = ['pwsh', 'powershell'];

  for (const shell of shells) {
    const result = spawnSync(shell, ['-NoProfile', '-Command', command], {
      stdio: 'inherit',
    });

    if (result.status === 0) {
      return;
    }

    if (result.error?.code !== 'ENOENT') {
      break;
    }
  }

  throw new Error(`Unable to remove ${distPath}`);
}

try {
  removeWithNode();
} catch (error) {
  if (process.platform !== 'win32' || error.code !== 'EPERM') {
    throw error;
  }

  removeWithPowerShell();
}
