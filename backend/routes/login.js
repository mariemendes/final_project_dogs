const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenPassword = 'mariane-project-jwt';
const UserModels = require('../../backend/models/UserModels');

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  let myUser = await UserModels.findOne({ username, password });
  if (!myUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = jwt.sign({ username }, tokenPassword, { expiresIn: '3h' });
  res.json({ token });
});

module.exports = router;
