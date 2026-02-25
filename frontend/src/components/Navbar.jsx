import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

/* ── Live date "Wed, Feb 25, 2026" ─── */
function useLiveDate() {
  const [date, setDate] = useState('');
  useEffect(() => {
    const fmt = () =>
      setDate(new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month:   'short',
        day:     'numeric',
        year:    'numeric',
      }));
    fmt();
    const id = setInterval(fmt, 60_000);
    return () => clearInterval(id);
  }, []);
  return date;
}

/* ── SVG icons ─────────────────────── */
const IconHome = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <polyline points="9 21 9 12 15 12 15 21"/>
  </svg>
);

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── Shared link/button reset styles ── */
const linkBase = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  background:     'none',
  border:         'none',
  cursor:         'pointer',
  textDecoration: 'none',
  lineHeight:     1,
  transition:     'color .18s',
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [active,        setActive]        = useState('#home');
  const [centerVisible, setCenterVisible] = useState(true);
  const lastYRef = useRef(0);
  const date = useLiveDate();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      /* Direction-based show/hide for center pill */
      if (y > 80) {
        if (y > lastYRef.current + 4) setCenterVisible(false);  // scrolling down
        else if (y < lastYRef.current - 4) setCenterVisible(true); // scrolling up
      } else {
        setCenterVisible(true); // always show near top
      }
      lastYRef.current = y;

      /* Active section tracking */
      const sections = [{ href: '#home' }, ...NAV_LINKS]
        .map(l => document.querySelector(l.href))
        .filter(Boolean);
      let current = '#home';
      sections.forEach(sec => {
        if (y >= sec.offsetTop - 140) current = `#${sec.id}`;
      });
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href) => {
    setMenuOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Shared hover handlers */
  const hoverOn  = e => { e.currentTarget.style.color = 'var(--text)'; };
  const hoverOff = (href) => e => {
    e.currentTarget.style.color = active === href ? 'var(--text)' : 'var(--text2)';
  };

  return (
    <>
      {/* ── Fixed nav shell — transparent, just for layout ── */}
      <nav style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         1000,
        height:         '60px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '0 32px',
        pointerEvents:  'none', /* let clicks fall through transparent zones */
      }}>

        {/* ── LEFT: date — always visible ───────────────── */}
        <div
          className="nav-date"
          style={{
            pointerEvents: 'auto',
            display:       'flex',
            alignItems:    'center',
            gap:           '6px',
            color:         'var(--text2)',
            fontSize:      '.8rem',
            fontFamily:    "'Inter', sans-serif",
            letterSpacing: '0.01em',
            minWidth:      '155px',
            flexShrink:    0,
          }}
        >
          <IconCalendar />
          {date}
        </div>

        {/* ── CENTER: nav pill — auto-hides on scroll down ─ */}
        <div
          className="nav-desktop nav-pill"
          style={{
            pointerEvents:         centerVisible ? 'auto' : 'none',
            display:               'flex',
            alignItems:            'center',
            gap:                   '0px',
            background:            'var(--pill-bg)',
            backdropFilter:        'blur(14px)',
            WebkitBackdropFilter:  'blur(14px)',
            border:                '1px solid var(--pill-border)',
            borderRadius:          '40px',
            padding:               '5px 8px',
            /* show/hide animation */
            opacity:               centerVisible ? 1 : 0,
            transform:             centerVisible ? 'translateY(0) translateX(-50%)' : 'translateY(-14px) translateX(-50%)',
            transition:            'opacity .28s ease, transform .28s ease',
            /* center it precisely */
            position:              'absolute',
            left:                  '50%',
          }}
        >
          {/* Home icon button */}
          <button
            onClick={() => handleLink('#home')}
            title="Home"
            style={{
              ...linkBase,
              padding:      '7px 11px',
              borderRadius: '30px',
              color:        active === '#home' ? 'var(--text)' : 'var(--text2)',
            }}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff('#home')}
          >
            <IconHome />
          </button>

          {/* Divider */}
          <span style={{
            width: '1px', height: '16px',
            background: 'var(--pill-border)',
            margin: '0 4px', flexShrink: 0,
          }} />

          {/* Text links */}
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={e => { e.preventDefault(); handleLink(l.href); }}
              style={{
                ...linkBase,
                padding:       '7px 14px',
                borderRadius:  '30px',
                fontSize:      '.86rem',
                fontWeight:    active === l.href ? 500 : 400,
                color:         active === l.href ? 'var(--text)' : 'var(--text2)',
                letterSpacing: '0.01em',
                /* subtle underline dot for active */
                position:      'relative',
              }}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff(l.href)}
            >
              {l.label}
              {/* active indicator dot */}
              {active === l.href && (
                <span style={{
                  position:     'absolute',
                  bottom:       '3px',
                  left:         '50%',
                  transform:    'translateX(-50%)',
                  width:        '4px',
                  height:       '4px',
                  borderRadius: '50%',
                  background:   'var(--text)',
                }} />
              )}
            </a>
          ))}
        </div>

        {/* ── RIGHT: theme toggle — always visible ──────── */}
        <div
          className="nav-theme"
          style={{
            pointerEvents: 'auto',
            display:       'flex',
            alignItems:    'center',
            gap:           '2px',
            minWidth:      '155px',
            justifyContent:'flex-end',
          }}
        >
          {/* Sun (light) */}
          <button
            onClick={() => theme !== 'light' && toggleTheme()}
            title="Light mode"
            style={{
              ...linkBase,
              padding:      '8px 10px',
              borderRadius: '8px',
              color:        theme === 'light' ? 'var(--text)' : 'var(--text2)',
              background:   theme === 'light' ? 'var(--hover-bg)' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color      = 'var(--text)';
              e.currentTarget.style.background = 'var(--hover-bg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color      = theme === 'light' ? 'var(--text)' : 'var(--text2)';
              e.currentTarget.style.background = theme === 'light' ? 'var(--hover-bg)' : 'none';
            }}
          >
            <IconSun />
          </button>

          {/* Moon (dark) */}
          <button
            onClick={() => theme !== 'dark' && toggleTheme()}
            title="Dark mode"
            style={{
              ...linkBase,
              padding:      '8px 10px',
              borderRadius: '8px',
              color:        theme === 'dark' ? 'var(--text)' : 'var(--text2)',
              background:   theme === 'dark' ? 'var(--hover-bg)' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color      = 'var(--text)';
              e.currentTarget.style.background = 'var(--hover-bg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color      = theme === 'dark' ? 'var(--text)' : 'var(--text2)';
              e.currentTarget.style.background = theme === 'dark' ? 'var(--hover-bg)' : 'none';
            }}
          >
            <IconMoon />
          </button>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              ...linkBase,
              padding:    '8px',
              borderRadius:'8px',
              color:      'var(--text)',
              fontSize:   '1.2rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ───────────────────────────────── */}
      {menuOpen && (
        <div style={{
          position:       'fixed',
          top:            '60px',
          left:           0,
          right:          0,
          zIndex:         999,
          background:     'var(--pill-bg)',
          borderBottom:   '1px solid var(--pill-border)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          padding:        '10px 28px 18px',
          animation:      'navSlideDown .2s ease',
        }}>
          <a href="#home" onClick={e => { e.preventDefault(); handleLink('#home'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 0', color: active === '#home' ? 'var(--text)' : 'var(--text2)',
              borderBottom: '1px solid var(--pill-border)', textDecoration: 'none',
              fontSize: '.88rem', fontWeight: active === '#home' ? 500 : 400,
            }}>
            <IconHome /> Home
          </a>

          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); handleLink(l.href); }}
              style={{
                display: 'block', padding: '11px 0',
                color: active === l.href ? 'var(--text)' : 'var(--text2)',
                borderBottom: '1px solid var(--pill-border)',
                textDecoration: 'none', fontSize: '.88rem',
                fontWeight: active === l.href ? 500 : 400,
              }}>
              {l.label}
            </a>
          ))}

          <button onClick={toggleTheme} style={{
            marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'var(--hover-bg)', border: '1px solid var(--pill-border)',
            borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
            color: 'var(--text)', fontSize: '.84rem',
          }}>
            {theme === 'dark' ? <><IconSun />&nbsp;Light Mode</> : <><IconMoon />&nbsp;Dark Mode</>}
          </button>
        </div>
      )}

      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-pill  { display: none !important; }
          .nav-theme .nav-sun-moon { display: none !important; }
        }
      `}</style>
    </>
  );
}
