// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // Try Authorization header first (Bearer <token>)
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  
  // Fall back to token header (direct token)
  if (!token) {
    token = req.headers['token'];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

export default auth;