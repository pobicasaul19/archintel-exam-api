const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
  {
    logo: {
      type: String,
      required: [true, 'A logo URL is required.'],
    },
    name: {
      type: String,
      required: [true, 'A company name is required.'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      required: [true, 'A status is required.'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
