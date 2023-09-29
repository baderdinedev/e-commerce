const User = require('../models/user'); // Import the User model

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
      // Fetch the user profile based on the authenticated user's ID
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the user profile.' });
    }
  };

  
  // Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
      const { name, email } = req.body;
      // Find the user by ID and update their name and email
      const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user profile.' });
    }
  };

  // Change user password
exports.changeUserPassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      // Find the user by ID and validate the current password
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.validatePassword(currentPassword)) {
        return res.status(400).json({ error: 'Invalid current password' });
      }
      // Update the password
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while changing the user password.' });
    }
  };

