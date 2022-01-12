const chai = require('chai');
chai.should();
const { expect } = chai;

const { MongoClient } = require('mongodb');

const configDev = require('../../server/config').development;
const configProd = require('../../server/config').production;
const configTest = require('../../server/config').test;

describe('The Database Connection String', () => {
  it('should be configured for development', async () => {
    expect(configDev.database.dsn).to.be.a('string');
  });
  it('should be configured for production', async () => {
    expect(configProd.database.dsn).to.be.a('string');
  });
  it('should be configured for testing', async () => {
    expect(configTest.database.dsn).to.be.a('string');
  });
});

describe('The database', function() {

  it('development should be reachable', async () => {
    const db = await MongoClient.connect(configDev.database.dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    expect(db).to.not.be.null;
    await db.close();
  });

  it('test should be reachable', async () => {
    const db = await MongoClient.connect(configTest.database.dsn, { useNewUrlParser: true });
    expect(db).to.not.be.null;
    await db.close();
  });

  it('production should be reachable', async () => {
    const db = await MongoClient.connect(configProd.database.dsn, { useNewUrlParser: true });
    expect(db).to.not.be.null;
    await db.close();
  });

});
