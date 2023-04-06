const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels.js');
const tokenVerify = require('../middlewares/tokenVerify.js');

router.get('/', tokenVerify, async (req, res) => {
  const { username } = req.user;

  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let myUser = await UserModels.findOne({ username });
    res.send(myUser);
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected Error' });
  }
});

module.exports = router;
