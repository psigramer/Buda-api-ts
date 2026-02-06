import request from 'supertest';

import app from '../src/app';

describe('GET /', () => {
  jest.setTimeout(30000 * 1000);

  it('returns a GET request', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});
