const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name:        { type: String, default: 'Janak Rokaya' },
    title:       { type: String, default: 'Engineering Student & Developer' },
    bio:         { type: String, default: 'Quick learner with a curious and problem-solving mindset.' },
    photoUrl:    { type: String, default: '' },
    email:       { type: String, default: 'your-email@gmail.com' },
    github:      { type: String, default: 'https://github.com/james0075k' },
    instagram:   { type: String, default: 'https://instagram.com/james.oo.7' },
    twitter:     { type: String, default: 'https://twitter.com/james007' },
    linkedin:    { type: String, default: '' },
    resumeUrl:   { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
