import { useEffect, useRef, useState } from 'react';
import localPhoto from '../images/avatar.jpg';

const ROLES = [
  'Engineering Student 🎓',
  'Aspiring Developer 💻',
  'Video Editor 🎬',
  'Quick Learner ⚡',
  'MERN Explorer 🌐',
];

function useTyping(words, speed = 90, pause = 1600) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting
      ? Math.max(30, speed / 2.5)
      : charIdx === word.length
      ? pause
      : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx === word.length) {
        setDeleting(true);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      } else {
        setCharIdx(i => i + (deleting ? -1 : 1));
        setDisplay(word.slice(0, charIdx + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Hero({ photoUrl }) {
  const typed = useTyping(ROLES);
  const scrollRef = useRef(null);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" style={{
      minHeight:      '100vh',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '100px 28px 60px',
      position:       'relative',
      zIndex:         1,
    }}>
      <div style={{
        maxWidth:  '1000px',
        width:     '100%',
        display:   'flex',
        alignItems: 'center',
        gap:       '60px',
        flexWrap:  'wrap',
        justifyContent: 'center',
      }}>

        {/* Text side */}
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          {/* greeting */}
          <p style={{
            fontFamily: "'Fira Code', monospace",
            color:      'var(--accent)',
            fontSize:   '1rem',
            marginBottom: '12px',
            animation:  'fadeUp .6s ease both',
          }}>
            &gt;_ Hello, World! 👋
          </p>

          {/* Name */}
          <h1 style={{
            fontSize:    'clamp(2.4rem, 6vw, 4rem)',
            fontWeight:  900,
            lineHeight:  1.1,
            marginBottom: '8px',
            animation:   'fadeUp .7s .1s ease both',
          }}>
            I'm{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Janak Rokaya
            </span>
          </h1>

          {/* Typed role */}
          <div style={{
            height:      '2.2rem',
            marginBottom: '24px',
            animation:   'fadeUp .7s .2s ease both',
          }}>
            <span style={{
              fontFamily:  "'Fira Code', monospace",
              fontSize:    'clamp(1rem, 2.5vw, 1.25rem)',
              color:       'var(--text2)',
            }}>
              {typed}
              <span style={{
                display:        'inline-block',
                width:          '2px',
                height:         '1.1em',
                background:     'var(--accent)',
                marginLeft:     '3px',
                verticalAlign:  'middle',
                animation:      'blink-cur .8s step-end infinite',
              }} />
            </span>
          </div>

          {/* Bio blurb */}
          <p style={{
            color:       'var(--text2)',
            lineHeight:  1.75,
            maxWidth:    '480px',
            marginBottom: '36px',
            animation:   'fadeUp .7s .3s ease both',
            fontSize:    '.98rem',
          }}>
            Engineering student at <strong style={{ color: 'var(--text)' }}>KEC Kalimati, Nepal</strong>.
            Passionate about building things for the web, creative video editing, and
            exploring the MERN stack. Always learning, always building.
          </p>

          {/* CTAs */}
          <div style={{
            display:   'flex',
            gap:       '16px',
            flexWrap:  'wrap',
            animation: 'fadeUp .7s .4s ease both',
          }}>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🚀 View Projects
            </button>
            <a
              className="btn btn-outline"
              href="/resume/Janak_Rokaya_Resume.md"
              download
            >
              📄 Download Resume
            </a>
          </div>

          {/* Quick stats */}
          <div style={{
            display:      'flex',
            gap:          '28px',
            marginTop:    '44px',
            flexWrap:     'wrap',
            animation:    'fadeUp .7s .5s ease both',
          }}>
            {[
              { label: 'Projects',    value: '1+' },
              { label: 'Batch',       value: '079' },
              { label: 'College',     value: 'KEC' },
              { label: 'Status',      value: 'Open' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontSize:   '1.6rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text2)', fontSize: '.82rem', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo side */}
        <div style={{
          flex:      '0 0 auto',
          animation: 'scaleIn .8s .2s ease both',
          position:  'relative',
        }}>
          {/* Outer spinning conic ring */}
          <div style={{
            position:     'absolute',
            inset:        '-16px',
            borderRadius: '50%',
            background:   'conic-gradient(var(--accent), var(--accent2), transparent 60%, var(--accent))',
            animation:    'rotate 7s linear infinite',
            opacity:      0.85,
          }} />
          {/* Gap ring — same colour as page bg */}
          <div style={{
            position:     'absolute',
            inset:        '-13px',
            borderRadius: '50%',
            background:   'var(--bg)',
          }} />

          {/* Photo frame */}
          <div style={{
            width:        '240px',
            height:       '240px',
            borderRadius: '50%',
            overflow:     'hidden',
            position:     'relative',
            boxShadow:    '0 0 48px var(--glow), 0 0 80px var(--glow2)',
            animation:    'float 5s ease-in-out infinite',
            border:       '2px solid var(--accent)',
          }}>
            <img
              src={photoUrl || localPhoto}
              alt="Janak Rokaya"
              style={{
                width:        '100%',
                height:       '100%',
                objectFit:    'cover',
                objectPosition: '50% 32%',
                display:      'block',
                filter:       'brightness(1.04) contrast(1.03)',
              }}
              onError={e => { e.target.src = localPhoto; }}
            />
          </div>

          {/* Small "available" badge */}
          <div style={{
            position:       'absolute',
            bottom:         '14px',
            right:          '-6px',
            background:     'var(--bg-card, #161b22)',
            border:         '1px solid var(--border)',
            borderRadius:   '20px',
            padding:        '5px 12px',
            display:        'flex',
            alignItems:     'center',
            gap:            '6px',
            fontSize:       '.75rem',
            fontWeight:     600,
            color:          'var(--text)',
            backdropFilter: 'blur(8px)',
            boxShadow:      '0 4px 16px var(--shadow)',
            whiteSpace:     'nowrap',
          }}>
            <span style={{
              width:        '7px',
              height:       '7px',
              borderRadius: '50%',
              background:   'var(--accent)',
              boxShadow:    '0 0 6px var(--accent)',
              animation:    'blink-cur 1.6s infinite',
              flexShrink:   0,
            }} />
            Available
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        ref={scrollRef}
        onClick={scrollDown}
        style={{
          position:   'absolute',
          bottom:     '32px',
          left:       '50%',
          transform:  'translateX(-50%)',
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          color:      'var(--accent)',
          fontSize:   '1.5rem',
          animation:  'bounce 1.6s ease-in-out infinite',
          opacity:    0.75,
        }}
        title="Scroll down"
      >
        ↓
      </button>
    </section>
  );
}
