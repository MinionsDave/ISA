const chai = require('chai');
const app = require('../app');
const request = require('supertest-as-promised');

const expect = chai.expect;

chai.config.includeStack = true;

describe('## User APIs', () => {
    describe('# GET /api/account', () => {
        it('should get all users', (done) => {
            request(app)
                .get('/api/account')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });
});
