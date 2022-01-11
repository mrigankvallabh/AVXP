const path = require('path');
require('dotenv').config();

const data = {
  speakers: path.join(__dirname, '../data/speakers.json'),
  feedback: path.join(__dirname, '../data/feedback.json'),
  avatars: path.join(__dirname, '../data/avatars'),
};

module.exports = {
  development: {
    sitename: 'Yusen Meetups [Development]',
    data: data
  },
  test: {
    sitename: 'Yusen Meetups [Test]',
    data: data
  },
  production: {
    sitename: 'Yusen Meetups [Development]',
    data: data
  },
};