const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Please Provide Token ' });

  jwt.verify(token, 'Deepak1234', (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Token expired' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
