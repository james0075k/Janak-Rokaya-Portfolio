import { useEffect, useState } from 'react';
import axios from 'axios';
import Hero     from '../components/Hero';
import About    from '../components/About';
import Skills   from '../components/Skills';
import Projects from '../components/Projects';
import Contact  from '../components/Contact';

const DEFAULT_PROFILE = {
  photoUrl: '',
  name:     'Janak Rokaya',
  bio:      'Engineering student passionate about building things.',
};

export default function Home() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    // Try to fetch dynamic profile from backend
    axios.get('/api/profile')
      .then(res => setProfile(res.data))
      .catch(() => setProfile(DEFAULT_PROFILE)); // fallback to static
  }, []);

  return (
    <main className="page-wrapper">
      <Hero     photoUrl={profile.photoUrl} />
      <About    photoUrl={profile.photoUrl} bio={profile.bio} />
      <Skills   />
      <Projects />
      <Contact  />
    </main>
  );
}
