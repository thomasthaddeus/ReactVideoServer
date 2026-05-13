import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientOrigin = 'http://127.0.0.1:3000';
const serverOrigin = 'http://localhost:3001';
const viteCacheDir = path.join(rootDir, '.vite-cache', 'smoke-client');
const startupTimeoutMs = 60_000;

let devProcess;
const output = [];

function log(message) {
  console.log(`[smoke] ${message}`);
}

function remember(chunk) {
  const text = chunk.toString();
  output.push(text);
  process.stdout.write(text);
}

function rememberError(chunk) {
  const text = chunk.toString();
  output.push(text);
  process.stderr.write(text);
}

async function request(url, options = {}) {
  return fetch(url, {
    redirect: 'manual',
    ...options,
  });
}

async function assertResponse(url, options = {}) {
  const response = await request(url, options);

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response;
}

async function waitForHttp(url, label) {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < startupTimeoutMs) {
    if (devProcess.exitCode !== null) {
      throw new Error(`${label} never started because npm run dev exited with ${devProcess.exitCode}`);
    }

    try {
      const response = await request(url);

      if (response.ok) {
        return response;
      }

      lastError = new Error(`${label} returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`${label} did not become ready: ${lastError?.message || 'timed out'}`);
}

async function isListening(url) {
  try {
    const response = await request(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function findFirstFile(dir, extensions) {
  let entries;

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return null;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nestedMatch = await findFirstFile(fullPath, extensions);

      if (nestedMatch) {
        return nestedMatch;
      }
    } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
      return fullPath;
    }
  }

  return null;
}

async function assertRouteSmoke() {
  const healthResponse = await assertResponse(`${serverOrigin}/health`);
  const health = await healthResponse.json();

  if (health.status !== 'ok') {
    throw new Error('/health returned unexpected JSON');
  }

  const catalogResponse = await assertResponse(`${serverOrigin}/catalog`, {
    headers: { Origin: clientOrigin },
  });
  const allowOrigin = catalogResponse.headers.get('access-control-allow-origin');

  if (allowOrigin !== clientOrigin) {
    throw new Error(`/catalog did not return the expected CORS origin. Received: ${allowOrigin}`);
  }

  const catalog = await catalogResponse.json();

  if (catalog.title !== 'Video Library' || !Array.isArray(catalog.sections) || catalog.sections.length === 0) {
    throw new Error('/catalog did not return the expected video library payload');
  }

  const videoFile = await findFirstFile(path.join(rootDir, 'server', 'media', 'videos'), ['.mp4']);
  if (videoFile) {
    const videoResponse = await assertResponse(`${serverOrigin}/video?video=${encodeURIComponent(path.basename(videoFile))}`, {
      method: 'HEAD',
    });

    const contentType = videoResponse.headers.get('content-type') || '';
    if (!contentType.includes('video')) {
      throw new Error(`/video returned an unexpected content-type: ${contentType}`);
    }
  } else {
    const missingVideo = await request(`${serverOrigin}/video?video=missing-smoke-test.mp4`);
    if (missingVideo.status !== 404) {
      throw new Error('/video did not return 404 for a missing file');
    }
  }

  const thumbnailFile = await findFirstFile(path.join(rootDir, 'server', 'media', 'thumbnails'), ['.png', '.jpg', '.jpeg', '.webp']);
  if (thumbnailFile) {
    const thumbnailResponse = await assertResponse(`${serverOrigin}/thumbnail?video=${encodeURIComponent(path.basename(thumbnailFile))}`);
    const contentType = thumbnailResponse.headers.get('content-type') || '';

    if (!contentType.startsWith('image/')) {
      throw new Error(`/thumbnail returned an unexpected content-type: ${contentType}`);
    }
  } else {
    const missingThumbnail = await request(`${serverOrigin}/thumbnail?video=missing-smoke-test.png`);
    if (missingThumbnail.status !== 404) {
      throw new Error('/thumbnail did not return 404 for a missing file');
    }
  }

  const docsRoot = path.join(rootDir, 'server', 'media', 'docs');
  const docFile = await findFirstFile(docsRoot, ['.pdf', '.txt', '.md']);
  if (docFile) {
    const relativeDocPath = path.relative(docsRoot, docFile).replaceAll(path.sep, '/');
    await assertResponse(`${serverOrigin}/docs/${relativeDocPath}`);
  }

  return catalog;
}

async function assertClientSmoke(catalog) {
  const clientResponse = await assertResponse(clientOrigin);
  const html = await clientResponse.text();

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Client HTML did not include the React root element');
  }

  if (!html.includes('/src/index.jsx')) {
    throw new Error('Client HTML did not include the Vite React entry module');
  }

  const entryResponse = await assertResponse(`${clientOrigin}/src/index.jsx`);
  const entryModule = await entryResponse.text();

  if (!entryModule.includes('createRoot') || !entryModule.includes('App')) {
    throw new Error('Client entry module did not include the React app bootstrap');
  }

  if (catalog.sections.length === 0) {
    throw new Error('Browser smoke cannot verify cards without catalog sections');
  }
}

async function startDevServer() {
  if (await isListening(clientOrigin)) {
    throw new Error(`${clientOrigin} is already responding. Stop the existing client before running smoke tests.`);
  }

  if (await isListening(`${serverOrigin}/health`)) {
    throw new Error(`${serverOrigin} is already responding. Stop the existing server before running smoke tests.`);
  }

  await fs.rm(viteCacheDir, { recursive: true, force: true });
  log('cleared smoke Vite cache');

  devProcess = spawn('npm run dev', {
    cwd: rootDir,
    env: {
      ...process.env,
      FORCE_COLOR: '0',
      VITE_CACHE_DIR: path.relative(path.join(rootDir, 'client'), viteCacheDir).replaceAll(path.sep, '/'),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    windowsHide: true,
  });

  devProcess.stdout.on('data', remember);
  devProcess.stderr.on('data', rememberError);

  await Promise.all([
    waitForHttp(clientOrigin, 'client'),
    waitForHttp(`${serverOrigin}/health`, 'server'),
  ]);
}

async function stopDevServer() {
  if (!devProcess || devProcess.exitCode !== null) {
    return;
  }

  if (process.platform === 'win32') {
    await new Promise((resolve) => {
      const killer = spawn('taskkill', ['/pid', String(devProcess.pid), '/t', '/f'], {
        stdio: 'ignore',
        windowsHide: true,
      });
      killer.on('close', resolve);
      killer.on('error', resolve);
    });
    return;
  }

  devProcess.kill('SIGTERM');
}

async function main() {
  try {
    await startDevServer();
    log('client and server are listening');
    const catalog = await assertRouteSmoke();
    log('server routes, catalog, and CORS passed');
    await assertClientSmoke(catalog);
    log('client startup smoke passed');
  } catch (error) {
    console.error(`\n[smoke] ${error.message}`);
    console.error('\n[smoke] recent output:');
    console.error(output.slice(-12).join(''));
    process.exitCode = 1;
  } finally {
    await stopDevServer();
  }
}

await main();
