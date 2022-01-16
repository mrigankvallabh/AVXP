const path = require('path');
const {readFile} = require('fs/promises');
const {existsSync} = require('fs');

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const { expect } = chai;

const helper = require('../../helper');

const { AvatarService, config } = helper;

describe('The Avatar Service', async () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it('should resize and store PNG images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_png.png`);
    const buffer = await readFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = existsSync(storedPath);
    expect(exists).to.be.true;
  });

  it('should resize and store JPG images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_jpg.jpg`);
    const buffer = await readFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = existsSync(storedPath);
    expect(exists).to.be.true;
  });

  it('should delete images', async () => {
    const avatars = new AvatarService(config.data.avatars);
    const filepath = path.resolve(`${__dirname}/../../helper/valid_png.png`);
    const buffer = await readFile(filepath);
    const filename = await avatars.store(buffer);
    expect(filename).to.be.not.empty;
    const storedPath = avatars.filepath(filename);
    const exists = existsSync(storedPath);
    expect(exists).to.be.true;
    await avatars.delete(filename);
    const existsDel = existsSync(storedPath);
    expect(existsDel).to.be.false;
  });
});
