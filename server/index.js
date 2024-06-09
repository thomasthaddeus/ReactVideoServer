// server/index.js

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const videoBasePath = process.env.VIDEO_BASE_PATH
  ? path.resolve(__dirname, process.env.VIDEO_BASE_PATH)
  : null;
const thumbnailBasePath = process.env.THUMBNAIL_BASE_PATH
  ? path.resolve(__dirname, process.env.THUMBNAIL_BASE_PATH)
  : null;

if (!videoBasePath || !thumbnailBasePath) {
  console.error(
    "VIDEO_BASE_PATH or THUMBNAIL_BASE_PATH is not set in .env file"
  );
  process.exit(1);
}

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/video", (req, res) => {
  if (!req.query.video) {
    return res.status(400).send("Video query parameter is required");
  }

  const videoPath = path.join(videoBasePath, req.query.video);

  res.sendFile(videoPath, (err) => {
    if (err) {
      if (!res.headersSent) {
        res.status(404).send("Video not found");
      }
    }
  });

  req.on("aborted", () => {
    console.error("Request aborted:", req.url);
  });
});

app.get("/thumbnail", (req, res) => {
  if (!req.query.video) {
    return res.status(400).send("Video query parameter is required");
  }

  const thumbnailPath = path.join(thumbnailBasePath, req.query.video);

  res.sendFile(thumbnailPath, (err) => {
    if (err) {
      if (!res.headersSent) {
        res.status(404).send("Thumbnail not found");
      }
    }
  });

  req.on("aborted", () => {
    console.error("Request aborted:", req.url);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
