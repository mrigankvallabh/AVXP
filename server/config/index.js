const path = require('path');
require('dotenv').config();
const bunyan = require('bunyan');

const loggers = {
  development: () => bunyan.createLogger({
    name: 'development',
    level: 'debug'
  }),
  test: () => bunyan.createLogger({
    name: 'test',
    level: 'fatal'
  }),
  production: () => bunyan.createLogger({
    name: 'production',
    level: 'info'
  }),
};

const data = {
  speakers: path.join(__dirname, '../data/speakers.json'),
  feedback: path.join(__dirname, '../data/feedback.json'),
  avatars: path.join(__dirname, '../data/avatars'),
};

module.exports = {
  development: {
    sitename: 'Yusen Meetups [Development]',
    log: loggers.development,
    data: data,
    database: {
      dsn: process.env.DEVELOPMENT_DB_DSN
    }
  },
  test: {
    sitename: 'Yusen Meetups [Test]',
    log: loggers.test,
    data: data,
    database: {
      dsn: process.env.TEST_DB_DSN
    }
  },
  production: {
    sitename: 'Yusen Meetups [Development]',
    log: loggers.production,
    data: data,
    database: {
      dsn: process.env.PRODUCTION_DB_DSN
    }
  },
};