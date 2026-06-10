// middleware/adminAuth.js
const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  try {
    // 1. Safely read header using optional chaining to prevent crashes if undefined
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token found or invalid format, authorization denied' });
    }

    // 2. Cleanly extract token value
    const token = authHeader.replace('Bearer ', '');
    
    // 3. Verify token with secret key
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
    
    // 4. Role enforcement check
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    
    // 5. Pass complete payload forward to controller routing
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Admin Authentication Middleware Error:", error.message);
    res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};

module.exports = adminAuth;