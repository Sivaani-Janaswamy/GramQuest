// models/Post.js
const mongoose = require('mongoose');   

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  attachments: [String], // URLs or filenames
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // New Fields
  stars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // users who starred
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // users who upvoted
  replies: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Post', postSchema);
