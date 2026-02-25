import { useState, useCallback } from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen   from './components/SplashScreen';
import AsteroidCanvas from './components/AsteroidCanvas';
import WaterRipple    from './components/WaterRipple';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import ScrollToTop    from './components/ScrollToTop';
import Home           from './pages/Home';
import Admin          from './pages/Admin';

export default function App() {
  // Show splash once per session; skip on /admin route
  const isAdmin = window.location.pathname === '/admin';
  const [splashDone, setSplashDone] = useState(
    () => isAdmin || sessionStorage.getItem('splashShown') === '1'
  );

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem('splashShown', '1');
    setSplashDone(true);
  }, []);

  return (
    <ThemeProvider>
      {/* Splash — shown before anything else */}
      {!splashDone && <SplashScreen onComplete={handleSplashDone} />}


      {/* Main app — fades in after splash */}
      <div style={{
        opacity:    splashDone ? 1 : 0,
        transition: splashDone ? 'opacity .6s ease' : 'none',
      }}>
        <BrowserRouter>
          {/* Background layers */}
          <AsteroidCanvas />
          <WaterRipple    />

          {/* App layer */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <Routes>
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home   />
                  <Footer />
                </>
              } />
              <Route path="/admin" element={
                <>
                  <Navbar />
                  <Admin  />
                </>
              } />
            </Routes>
            <ScrollToTop />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
