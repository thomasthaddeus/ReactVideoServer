const express = require('express');
const catalog = require('../data/catalog.json');
const { resolveMediaFile } = require('../services/mediaLibrary');

function createMediaRouter({ videosPath, thumbnailsPath }) {
  const router = express.Router();

  router.get('/video', (req, res) => {
    const videoPath = resolveMediaFile(videosPath, req.query.video);

    if (!videoPath) {
      return res.status(404).send('Video not found');
    }

    return res.sendFile(videoPath, (err) => {
      if (err && !res.headersSent) {
        res.status(404).send('Video not found');
      }
    });
  });

  router.get('/thumbnail', (req, res) => {
    const thumbnailPath = resolveMediaFile(thumbnailsPath, req.query.video);

    if (!thumbnailPath) {
      return res.status(404).send('Thumbnail not found');
    }

    return res.sendFile(thumbnailPath, (err) => {
      if (err && !res.headersSent) {
        res.status(404).send('Thumbnail not found');
      }
    });
  });

  router.get('/catalog', (req, res) => {
    res.json(catalog);
  });

  return router;
}

module.exports = createMediaRouter;
