// server/routes/users.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const { generateToken } = require('../auth/auth');
const userController = require('../controllers/userController');


// Register a new user
router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username, email: req.body.email, role: req.body.role }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = generateToken(user);
      res.status(200).json({ token });
    }
  );
});

// Login user
router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = generateToken(req.user);
  res.status(200).json({ token });
});


// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile', userController.updateUserProfile);

// Change user password
router.put('/change-password', userController.changeUserPassword);


module.exports = router;
