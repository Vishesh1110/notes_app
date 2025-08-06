const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
require('./config/passport');

dotenv.config();

const app = express();

// ✅ Allow requests from frontend (important!)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Session (required for passport)
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Body parser
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

// MongoDB connect and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Server running on port ${process.env.CLIENT_URL}`);
    });
  })
  .catch((err) => console.error(err));
