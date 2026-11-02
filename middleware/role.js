// backend/middleware/role.js
// Usage: router.get('/admin-only', auth, allowRoles('admin'), handler)
// Must run AFTER the `auth` middleware, since it needs req.user (set by auth.js)

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'No role found, access denied' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${allowedRoles.join(', ')}`,
      });
    }

    next();
  };
};

export default allowRoles;