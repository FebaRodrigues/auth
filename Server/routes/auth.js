const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');//models  ninnn Userne edithu import cheyyan userne

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;// username, password idh ok anel dashboardil pogum allel error
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });


    // username, password ok ayal token generate aagum
    //token generate ayillel loginil prashnam ind
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Verify Token//login cheyada mathere eg flipcart login cheyada mathre buy aakan pattu
router.get('/verify', (req, res) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
//protected route cheyyanam like headers poyit barear token pass akanam
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;