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

  it('returns the generated catalog', async () => {
    const response = await request(app)
      .get('/catalog')
      .expect(200)
      .expect('content-type', /json/);

    if (response.body.title !== 'Video Library') {
      throw new Error('Expected catalog title');
    }

    if (!Array.isArray(response.body.sections) || response.body.sections.length === 0) {
      throw new Error('Expected catalog sections');
    }

    if (!Object.prototype.hasOwnProperty.call(response.body.sections[0], 'fileSizeBytes')) {
      throw new Error('Expected catalog metadata');
    }
  });

  it('allows the dev client to fetch the catalog', async () => {
    await request(app)
      .get('/catalog')
      .set('Origin', 'http://127.0.0.1:3000')
      .expect('access-control-allow-origin', 'http://127.0.0.1:3000')
      .expect(200);
  });

  it('returns 404 for a missing video file', async () => {
    await request(app)
      .get('/video')
      .query({ video: 'non-existent.mp4' })
      .expect(404);
  });

  it('rejects path traversal attempts for video files', async () => {
    await request(app)
      .get('/video')
      .query({ video: '../catalog.json' })
      .expect(400);
  });

  it('returns 404 for a missing thumbnail file', async () => {
    await request(app)
      .get('/thumbnail')
      .query({ video: 'non-existent.png' })
      .expect(404);
  });

  it('rejects path traversal attempts for thumbnail files', async () => {
    await request(app)
      .get('/thumbnail')
      .query({ video: '..\\catalog.json' })
      .expect(400);
  });

  it('rate limits repeated media route requests', async () => {
    let statusCode = 200;

    for (let requestCount = 0; requestCount < 130 && statusCode !== 429; requestCount += 1) {
      const response = await request(app).get('/catalog');
      statusCode = response.statusCode;
    }

    if (statusCode !== 429) {
      throw new Error('Expected media routes to return 429 under repeated requests');
    }
  });
});
