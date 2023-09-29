function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      return next(); // User is an admin, allow the action
    }
    return res.status(403).json({ error: 'Permission denied. Only admins can perform this action.' });
  }
  
  module.exports = { isAdmin };
  