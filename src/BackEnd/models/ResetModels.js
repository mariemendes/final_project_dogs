const mongoose = require('mongoose');

const ResetModels = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  token: { type: String, required: true },
});

const ResetRequest = mongoose.model('ResetRequest', ResetModels);

module.exports = ResetRequest;
