const chai = require('chai');
const chaiHttp = require('chai-http');
// const { expect } = require('chai'); // ? if you want to use expect assertions
require('chai').should(); // ? if you want to use should assertions

const config = require('./helper');
const app = require('../server/app')(config);

chai.use(chaiHttp);

describe('The Application', function() {
  it('should have an index route', async function () {
    this.timeout(5000);
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
  });

  it('should have a speakers route', async () => {
    const res = await chai.request(app).get('/speakers');
    res.should.have.status(200);
  });

  it('should have a feedback route', async () => {
    const res = await chai.request(app).get('/feedback');
    res.should.have.status(200);
  });

  it('should have a registration route', async () => {
    const res = await chai.request(app).get('/users/registration');
    res.should.have.status(200);
  });

});