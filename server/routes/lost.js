const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels.js');
const ResetRequest = require('../models/ResetModels.js');
const nodemailer = require('nodemailer');
const Mailgun = require('mailgun-js');

// Define email transport configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: 'postmaster@sandbox6c24c00991b64155a41d3cef730b3afe.mailgun.org',
    pass: 'a214713e21ecd28d17d39ab9287f427f-81bd92f8-fdc03870',
  },
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  try {
    // Find user with matching email
    const user = await UserModels.findOne({ email });
    // Generate random token for reset request
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Save reset request to database
    const resetRequest = new ResetRequest({
      userId: user._id,
      token,
    });
    await resetRequest.save();

    // Send email with reset link
    const resetLink = `http://localhost:3000/login/reset?token=${token}`;
    const mailOptions = {
      from: 'mmendes00@mylangara.ca',
      to: email,
      subject: 'Password reset request',
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
    // Return success message
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: { message: 'Server error', details: error.message } });
  }
});

module.exports = router;
