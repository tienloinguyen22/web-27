const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    require: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModifiedAt: Date,
});

const PostsModel = mongoose.model('Post', PostSchema);

module.exports = PostsModel;