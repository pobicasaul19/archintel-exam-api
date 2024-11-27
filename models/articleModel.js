const mongoose = require('mongoose');

// Validation regex for URL format
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[^\s]*)?$/;

const articleSchema = mongoose.Schema(
  {
    relatedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'A related company is required.'],
    },
    image: {
      type: String,
      required: [true, 'An image URL is required.'],
    },
    title: {
      type: String,
      required: [true, 'A title is required.'],
    },
    link: {
      type: String,
      required: [true, 'A link is required.'],
      validate: {
        validator: (value) => urlRegex.test(value),
        message: 'Invalid URL format.',
      },
    },
    date: {
      type: Date,
      required: [true, 'A publication date is required.'],
    },
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);
