const chai = require('chai');
const chaiHttp = require('chai-http');
const path = require('path');
const server = require('../index'); // Adjust the path if needed
const { expect } = chai;

chai.use(chaiHttp);

describe('Video and Thumbnail Endpoints', () => {
  it('should return a video file', (done) => {
    chai.request(server)
      .get('/videos')
      .query({ video: 'CenterfireRifles-Disc1.mp4' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'video/mp4');
        done();
      });
  });

  it('should return a thumbnail file', (done) => {
    chai.request(server)
      .get('/thumbnails')
      .query({ video: 'CenterfireRifles-Disc1.png' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'image/png');
        done();
      });
  });

  it('should return 404 for non-existent video file', (done) => {
    chai.request(server)
      .get('/videos')
      .query({ video: 'non-existent.mp4' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 404 for non-existent thumbnail file', (done) => {
    chai.request(server)
      .get('/thumbnails')
      .query({ video: 'non-existent.png' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
