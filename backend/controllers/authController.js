// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Called after successful Google login
exports.googleCallback = async (req, res) => {
  const user = req.user;
  const token = generateToken(user);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });

  res.redirect(`${process.env.CLIENT_URL}/home`);
};

// Logout user by clearing the JWT cookie
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect(`${process.env.CLIENT_URL}/login`);
};