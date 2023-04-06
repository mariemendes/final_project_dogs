const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  petname: {
    type: String,
    required: true,
  },
  petage: {
    type: Number,
    required: true,
  },
  petweight: {
    type: Number,
    required: true,
  },
  petimg: {
    data: Buffer,
    contentType: {
      type: String,
      default: 'image/png',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
