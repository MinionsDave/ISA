const chai = require('chai');
const app = require('../app');
const request = require('supertest-as-promised');

const expect = chai.expect;
const User = require('../models/user');

chai.config.includeStack = true;

describe('## Account APIs', () => {
    let user = {
        username: '6542321@qq.com',
        password: '5465321'
    }

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

    describe('# POST /api/account', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/api/account')
                .send(user)
                .expect(200)
                .then(() => User.findOne({
                    username: user.username
                }))
                .then(userObj => {
                    expect(userObj.username).to.equal(user.username);
                    user = userObj;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/account/active/:activeToken', () => {
        it('should active the user', (done) => {
            request(app)
                .get(`/api/account/active/${ user.activeToken }`)
                .expect(200)
                .then(() => User.findOne({
                    username: user.username
                }))
                .then(userObj => {
                    expect(userObj.active).to.be.true;
                    user = userObj;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/account/checkUser/:username', () => {
        it('should return user is exists', (done) => {
            request(app)
                .get(`/api/account/checkUser/${ user.username }`)
                .expect(400, done);
        });

        it('should return user is not exists',  (done) => {
            request(app)
                .get(`/api/account/checkUser/asdcbrhdhf`)
                .expect(200, done);
        });

    });

    describe('# DELETE /api/account/:id', () => {
        it('should delete the user', (done) => {
            request(app)
                .delete(`/api/account/${ user._id }`)
                .expect(200)
                .then((res) => {
                    expect(res.body.message).to.equal('删除成功');
                    done();
                })
                .catch(done);
        });
    });
});
