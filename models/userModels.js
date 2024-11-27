const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add your last name'],
    },
    type: {
      type: String,
      enum: ['Writer', 'Editor'],
      required: [true, 'Please specify the type (Writer or Editor)'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: [true, 'Please specify the status (Active or Inactive)'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.validateUser = function (user) {
  const { firstName, lastName, type, status } = user;
  if (!firstName || !lastName) {
    throw new Error('First name and last name are required.');
  }
  if (!['Writer', 'Editor'].includes(type)) {
    throw new Error('Invalid type. Allowed values are Writer or Editor.');
  }
  if (!['Active', 'Inactive'].includes(status)) {
    throw new Error('Invalid status. Allowed values are Active or Inactive.');
  }
};

module.exports = mongoose.model('User', userSchema);
