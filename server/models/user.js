// server/models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String, // Password field (no need to specify unique: true)
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
  },
});

// Add passport-local-mongoose to the user schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
