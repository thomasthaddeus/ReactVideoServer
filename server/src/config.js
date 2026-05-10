const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mediaRoot = path.resolve(__dirname, '../media');

module.exports = {
  port: process.env.PORT || 3001,
  mediaRoot,
  videosPath: path.resolve(__dirname, '..', process.env.VIDEO_BASE_PATH || 'media/videos'),
  thumbnailsPath: path.resolve(__dirname, '..', process.env.THUMBNAIL_BASE_PATH || 'media/thumbnails'),
  docsPath: path.resolve(__dirname, '..', process.env.DOCS_BASE_PATH || 'media/docs'),
};
