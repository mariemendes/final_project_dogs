const jwt = require('jsonwebtoken');
const tokenPassword = 'mariane-project-jwt';

function tokenVerify(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing Token' });
  }

  try {
    const decoded = jwt.verify(token, tokenPassword);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid Token' });
  }
}

module.exports = tokenVerify;
