const request = require('supertest');
const app = require('../index');

describe('Video and Thumbnail Endpoints', () => {
  it('returns health status', async () => {
    await request(app)
      .get('/health')
      .expect(200)
      .expect('content-type', /json/)
      .expect({ status: 'ok' });
  });

  it('returns a video file', async () => {
    await request(app)
      .head('/video')
      .query({ video: 'CenterfireRifles-Disc1.mp4' })
      .expect(200)
      .expect('content-type', /video\/mp4/);
  });

  it('returns a thumbnail file', async () => {
    await request(app)
      .get('/thumbnail')
      .query({ video: 'CenterfireRifles-Disc1.png' })
      .expect(200)
      .expect('content-type', /image\/png/);
  });

  it('returns 404 for a missing video file', async () => {
    await request(app)
      .get('/video')
      .query({ video: 'non-existent.mp4' })
      .expect(404);
  });

  it('returns 404 for a missing thumbnail file', async () => {
    await request(app)
      .get('/thumbnail')
      .query({ video: 'non-existent.png' })
      .expect(404);
  });
});
