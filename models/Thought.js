const mongoose = require('mongoose');
const reactionSchema = require('./reactionSchema');

// Define Thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => new Date(createdAtVal).toISOString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Embed Reaction schema as an array of subdocuments
});

// Create Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
