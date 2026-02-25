const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const router  = express.Router();

// In production, store admin credentials in DB.
// For this portfolio, we use env variables for simplicity.
const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  if (username !== ADMIN_USER)
    return res.status(401).json({ message: 'Invalid credentials' });

  const valid = password === ADMIN_PASS;
  if (!valid)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );

  res.json({ token, message: 'Login successful' });
});

// POST /api/auth/verify
router.post('/verify', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ valid: false });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    res.json({ valid: true });
  } catch {
    res.json({ valid: false });
  }
});

module.exports = router;
