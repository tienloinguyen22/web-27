const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModifiedAt: Date,
});
const UsersModel = mongoose.model('User', UserSchema);

module.exports = UsersModel;