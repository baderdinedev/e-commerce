// server/auth/auth.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configure the local strategy for login
passport.use(new LocalStrategy(User.authenticate()));

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, 'your-secret-key', {
    expiresIn: '1h', // Token expiration time
  });
};

module.exports = { passport, generateToken };
