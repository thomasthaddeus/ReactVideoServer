const express = require('express');
const config = require('./config');
const createMediaRouter = require('./routes/media');

function createApp(appConfig = config) {
  const app = express();

  app.use('/docs', express.static(appConfig.docsPath));
  app.use(createMediaRouter(appConfig));

  return app;
}

module.exports = createApp;
