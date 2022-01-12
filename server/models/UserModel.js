const { Schema, model } = require("mongoose");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
      validate: {
        validator: emailValidator.validate,
        message: props => `${props.value} is not a valid email format`
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true },
      minlength: 8,
    },
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if(!user.isModified('password')) {
    next();
  }
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
}

module.exports = model('User', UserSchema);