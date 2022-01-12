const { readdir, unlink, rm } = require('fs/promises');
const path = require('path');

const config = require('../../server/config').test;

let db = null;
let UserModel = null;
let AvatarService = null;

try {
  db = require('../../server/lib/db');
} catch (err) {
  console.log('db ignored');
};

try {
  UserModel = require('../../server/models/UserModel');
} catch (err) {
  console.log('UserModel ignored');
};

try {
  AvatarService = require('../../server/services/AvatarService');
} catch (err) {
  console.log('Avatars ignored');
};

const validUser = {
  username: 'Casper',
  email: 'casper@acme.fake',
  password: 'verysecret',
};

async function createUser(agent, user) {
  agent
    .post('/users/registration')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(user);
}

async function loginUser(agent, email, password) {
  agent
    .post('/users/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email, password });
}

async function deleteFilesInDir(directory) {
  const files = await readdir(directory);
  const fileProm = [];
  files.forEach((file) => {
    fileProm.push(rm(path.join(directory, file), {recursive: true, force: true}));
  });

  return Promise.all(fileProm);
}

async function before() {
  if(db) {
    await db.connect(config.database.dsn);
  }

  if(UserModel) {
    return UserModel.deleteMany({});
  }

  return true;
}

async function after() {
  if(UserModel) {
    await UserModel.deleteMany({});
  }
  return deleteFilesInDir(config.data.avatars);
}

module.exports = {config, db, UserModel, AvatarService, validUser, createUser, loginUser, before, after};