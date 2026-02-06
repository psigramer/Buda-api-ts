const app = require("../app");
const request = require('supertest');


describe('GET /', function() {
  jest.setTimeout(30000* 1000);
    it('returns a GET request', function(done) {
      request(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
        
    });
  });
