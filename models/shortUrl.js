const mongoose = require('mongoose');
const shortid = require('shortid');
const validator = require('validator');

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: [true, 'Full url is required'],
    validate: [validator.isURL, 'Invalid URL'],
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    require: true,
    default: 0,
  },
  creator: {
    type: String,
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
