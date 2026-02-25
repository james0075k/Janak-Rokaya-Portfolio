const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const jwt      = require('jsonwebtoken');
const Profile  = require('../models/Profile');
const router   = express.Router();
const fs       = require('fs');

// ── Auth middleware ─────────────────────────────────────────
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// ── Multer storage ─────────────────────────────────────────
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename:    (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error('Only image files allowed'));
  },
});

// ── GET /api/profile ──────────────────────────────────────
router.get('/', async (_req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PUT /api/profile (protected) ─────────────────────────
router.put('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/profile/photo (protected) ──────────────────
router.post('/photo', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const photoUrl = `/uploads/${req.file.filename}`;
    const profile  = await Profile.findOneAndUpdate(
      {},
      { $set: { photoUrl } },
      { new: true, upsert: true }
    );
    res.json({ photoUrl, profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
