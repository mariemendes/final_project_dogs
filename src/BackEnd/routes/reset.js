const express = require('express');
const router = express.Router();
const UserModels = require('../../models/UserModels.js');
const ResetRequest = require('../../models/ResetModels.js');

//reset password
// Define endpoint for password reset verification
router.post('/', async (req, res) => {
  const { key, password } = req.body;
  console.log(key);
  console.log(password);

  try {
    // Find reset request with matching token
    const resetRequest = await ResetRequest.findOne({ token: key });
    if (!resetRequest) {
      res.status(400).json({ error: 'Request not found' });
    }
    console.log(resetRequest);
    // Find user with matching user ID from reset request
    const user = await UserModels.findOne(resetRequest.userId);
    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }
    // Update user password
    user.password = password;
    await user.save();

    // Delete reset request from database
    await ResetRequest.deleteOne({ _id: resetRequest._id });
    // Return success message
    res.status(200).json({ error: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
