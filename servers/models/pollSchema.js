const mongoose = require('mongoose');

// Poll schema
const pollSchema = new mongoose.Schema({
  question: String,
  options: [{
    option: String,
    votes: { type: Number, default: 0 }
  }]
});

// Create and export the Poll model
const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
