const mongoose = require('mongoose');

const userSchemaSignup = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
      sparse: true,
    },
    email: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
    },
    provider: {
      type: String,
      default: 'local',
    },
  },
  {
    timestamps: true,
  }
);

//pre saved validation hook
userSchemaSignup.pre('save', function (next) {
  if (this.provider === 'local' && !this.password) {
    const error = new Error('Password is required for local users');
    error.name = 'ValidationError';
    return next(error);
  }
  next();
});

const UserSignup = mongoose.model('userSignup', userSchemaSignup);
module.exports = UserSignup;
