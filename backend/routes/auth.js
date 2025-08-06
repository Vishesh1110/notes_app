const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Route to start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Optional: expire in 7 days
    );

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // ✅ Use `true` in production with HTTPS
      sameSite: 'Lax',
    });

    // Redirect to frontend home page
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);

// Logout route — clears cookie
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

// Route to get logged-in user (based on token)
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json(null);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(401).json(null);
  }
});

module.exports = router;
