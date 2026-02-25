# Janak Rokaya — Portfolio Website

🌐 **Live Site:** [https://james0075k.github.io/Janak-Rokaya-Portfolio/](https://james0075k.github.io/Janak-Rokaya-Portfolio/)

Full-stack MERN portfolio with asteroid canvas background, water ripple effects,
dark/light mode, scroll animations, and an admin panel to update your photo.

---

## Folder Structure

```
portfolio/
├── frontend/   ← React + Vite (static-capable)
└── backend/    ← Node.js + Express + MongoDB (optional for dynamic features)
```

---

## Quick Start

### Option A — Static Only (no backend needed)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The site works fully as a static site. The admin panel and dynamic photo update
require the backend (Option B).

---

### Option B — Full MERN Stack

**1. Backend setup**

```bash
cd backend
npm install

# Copy env file and fill in your values
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD

npm run dev
# → http://localhost:5000
```

**2. Frontend setup**

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Features

| Feature | Status |
|---|---|
| Asteroid + starfield canvas background | ✅ |
| Water ripple on mouse move & click | ✅ |
| Dark / Light mode toggle (persisted) | ✅ |
| Scroll-reveal animations | ✅ |
| Typing animation in Hero | ✅ |
| Animated skill bars | ✅ |
| Project cards with hover effects | ✅ |
| Contact form | ✅ |
| Responsive (mobile + tablet + desktop) | ✅ |
| Smooth scroll navbar with active state | ✅ |
| Scroll-to-top button | ✅ |
| Admin panel — login with JWT | ✅ |
| Admin panel — photo upload (Multer) | ✅ |
| Admin panel — edit bio & links | ✅ |
| MongoDB profile persistence | ✅ |
| Static fallback (works without backend) | ✅ |

---

## Admin Panel

1. Go to `http://localhost:5173/admin`
2. Login with credentials from your `.env` file
3. Upload a new profile photo
4. Edit your name, bio, social links
5. Click **Save Changes**

---

## Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Upload /dist to Vercel or Netlify
```

### Backend (Railway / Render)
```bash
# Set environment variables in your hosting dashboard
# Deploy the /backend folder
```

### GitHub Pages (static only)
```bash
cd frontend
npm run build
# Push /dist contents to gh-pages branch
```

---

## Customization

Edit `src/components/Projects.jsx` → add your own projects.
Edit `src/components/Skills.jsx`   → update skill percentages.
Edit `src/components/Contact.jsx`  → replace the Formspree ID.
Edit `src/components/Hero.jsx`     → change ROLES array.
Edit `src/pages/Home.jsx`          → update default profile.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, React Router |
| Styling | Pure CSS with CSS Variables |
| Animations | Canvas API, Intersection Observer, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken) |
| File Upload | Multer |
| HTTP Client | Axios |
