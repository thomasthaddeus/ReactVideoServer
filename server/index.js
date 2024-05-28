// server/index.js

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

const videoBasePath = path.resolve(__dirname, process.env.VIDEO_BASE_PATH);
const thumbnailBasePath = path.resolve(__dirname, process.env.THUMBNAIL_BASE_PATH);

app.use(express.static('public'));

app.get('/video', (req, res) => {
  const videoPath = path.join(videoBasePath, req.query.video);

  const sendFile = () => {
    res.sendFile(videoPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(404).send('Video not found');
        }
      }
    });
  };

  req.on('aborted', () => {
    console.error('Request aborted:', req.url);
  });

  sendFile();
});

app.get('/thumbnail', (req, res) => {
  const thumbnailPath = path.join(thumbnailBasePath, req.query.video);

  const sendFile = () => {
    res.sendFile(thumbnailPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(404).send('Thumbnail not found');
        }
      }
    });
  };

  req.on('aborted', () => {
    console.error('Request aborted:', req.url);
  });

  sendFile();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
