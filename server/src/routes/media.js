const express = require('express');
const rateLimit = require('express-rate-limit');
const catalog = require('../data/catalog.json');
const {
  normalizeRequestedMediaPath,
  resolveMediaFile,
} = require('../services/mediaLibrary');

const mediaRateLimitOptions = {
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many media requests, please try again later.',
};

function createMediaRouter({ videosPath, thumbnailsPath }) {
  const router = express.Router();

  router.use(rateLimit(mediaRateLimitOptions));

  router.get('/video', (req, res) => {
    const requestedVideo = normalizeRequestedMediaPath(req.query.video);

    if (!requestedVideo) {
      return res.status(400).send('Invalid video path');
    }

    const videoPath = resolveMediaFile(videosPath, requestedVideo);

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
    const requestedThumbnail = normalizeRequestedMediaPath(req.query.video);

    if (!requestedThumbnail) {
      return res.status(400).send('Invalid thumbnail path');
    }

    const thumbnailPath = resolveMediaFile(thumbnailsPath, requestedThumbnail);

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
