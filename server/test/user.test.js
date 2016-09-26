const chai = require('chai');
const app = require('../app');
const request = require('supertest-as-promised');

const expect = chai.expect;
const User = require('../models/user');

chai.config.includeStack = true;

const agent = request.agent(app);

describe('## Account APIs', () => {

    let user = {
        username: 'asdads@qq.com',
        password: '123456'
    }, activeToken;


    describe('# POST /api/account', () => {
        it('should create a new user', (done) => {
            agent
                .post('/api/account')
                .send(user)
                .expect(200)
                .then(() => User.findOne({
                    username: user.username
                }))
                .then(userObj => {
                    expect(userObj.username).to.equal(user.username);
                    activeToken = userObj.activeToken;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/account', () => {
        it('should get all users', (done) => {
            agent
                .get('/api/account')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });


    describe('# GET /api/account/active/:activeToken', () => {
        it('should active the user', (done) => {
            agent
                .get(`/api/account/active/${ activeToken }`)
                .expect(200)
                .then(() => User.findOne({
                    username: user.username
                }))
                .then(userObj => {
                    expect(userObj.active).to.be.true;
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /api/login', () => {
        it('should login success', (done) => {
            agent
                .post('/api/login')
                .send(user)
                .expect('Content-Type', /json/)
                .expect(res => {
                    expect(res.body.username).to.equal(user.username);
                    user = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/account/checkUser/:username', () => {
        it('should return user is exists', (done) => {
            agent
                .get(`/api/account/checkUser/${ user.username }`)
                .expect(400, done);
        });

        it('should return user is not exists',  (done) => {
            agent
                .get(`/api/account/checkUser/asdcbrhdhf`)
                .expect(200, done);
        });

    });

    describe('# DELETE /api/account/:id', () => {
        it('should delete the user', (done) => {
            agent
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
