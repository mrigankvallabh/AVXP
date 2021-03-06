const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();
const { expect } = chai;

const helper = require('../../helper');

const { UserModel } = helper;

describe('The mongoose schema', async () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it('should store the password encrypted', async () => {
    const user = new UserModel(helper.validUser);
    await user.save();
    const foundUser = await UserModel.findOne({ email: helper.validUser.email }).exec();
    expect(foundUser.password).to.exist;
    expect(foundUser.password).to.not.equal(helper.validUser.password);
  });

  it('should be able to correctly validate a password', async () => {
    const user = new UserModel(helper.validUser);
    await user.save();
    const foundUser = await UserModel.findOne({ email: helper.validUser.email }).exec();
    expect(foundUser).to.be.not.null;
    expect(foundUser.password).to.exist;
    const compResInvalid = await foundUser.comparePassword('IncorrectPassword');
    expect(compResInvalid).to.be.false;
    const compresValid = await foundUser.comparePassword(helper.validUser.password);
    expect(compresValid).to.be.true;
  });
});
