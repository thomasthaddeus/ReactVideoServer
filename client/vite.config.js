import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: '..',
  cacheDir: process.env.VITE_CACHE_DIR || '../.vite-cache/client',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
