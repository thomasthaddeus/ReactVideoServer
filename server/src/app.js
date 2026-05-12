const express = require('express');
const config = require('./config');
const createMediaRouter = require('./routes/media');

function createApp(appConfig = config) {
  const app = express();

  app.use((req, res, next) => {
    const allowedOrigins = new Set([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ]);
    const origin = req.get('origin');

    if (allowedOrigins.has(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Vary', 'Origin');
    }

    res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    return next();
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/docs', express.static(appConfig.docsPath));
  app.use(createMediaRouter(appConfig));

  return app;
}

module.exports = createApp;
