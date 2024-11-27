const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, 'archTestKey', (err, authData) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden access." });
      }
      req.authData = authData;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

module.exports = { verifyToken };
