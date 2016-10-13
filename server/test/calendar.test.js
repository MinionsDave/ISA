const { expect } = require('chai');
const app = require('../app');
const agent = require('supertest-as-promised').agent(app);

describe('## Calendar APIs', () =>  {
    before(done => {
        agent
            .post('/api/login')
            .send({
                username: '651882883@qq.com',
                password: '123456'
            })
            .then(() => done());
    });

    // describe('# GET /api/calendar/:datetime', () => {
    //     it('should return a month\'s date', done => {
    //         let datetime = new Date('2016-9-26').getTime();
    //         agent
    //             .get(`/api/calendar/${ datetime }`)
    //             .expect(200)
    //             .expect(({ body }) => {
    //                 expect(body.length).to.equal(42);
    //                 expect(body[0].date).to.equal(new Date('2016-8-28').getTime());
    //                 expect(body[41].date).to.equal(new Date('2016-10-8').getTime());
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });
});
