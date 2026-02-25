import { useEffect, useRef, useState } from 'react';
import CatFollower from './CatFollower';
import localPhoto  from '../images/avatar.jpg';
import aboutPhoto  from '../images/avatar2.jpg';
import strawHat   from '../images/strawhat.png';

/* ── Live age counter ──────────────────────────────────── */
const BIRTH = new Date('2004-01-01'); // ← update to your real birthday
function useLiveAge() {
  const [age, setAge] = useState('');
  useEffect(() => {
    const tick = () => {
      const v = (Date.now() - BIRTH.getTime()) / (365.25 * 24 * 3600 * 1000);
      setAge(v.toFixed(8));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);
  return age;
}

/* ── Inline tech badge ─────────────────────────────────── */
function Badge({ slug, label, color }) {
  return (
    <span style={{
      display:       'inline-flex',
      alignItems:    'center',
      gap:           '4px',
      background:    `${color}18`,
      border:        `1px solid ${color}44`,
      borderRadius:  '5px',
      padding:       '1px 8px',
      fontSize:      '.88rem',
      fontWeight:    600,
      color,
      verticalAlign: 'middle',
      margin:        '0 2px',
    }}>
      <img
        src={`https://skillicons.dev/icons?i=${slug}`}
        width="13" height="13" alt={label}
        style={{ objectFit: 'contain', display: 'block' }}
      />
      {label}
    </span>
  );
}

/* ── Snake contribution graph ──────────────────────────── */
function SnakeGraph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLS = 53, ROWS = 7, S = 12, G = 3, T = S + G;
    canvas.width  = COLS * T + G;
    canvas.height = ROWS * T + G;

    /* seeded PRNG */
    let seed = 7919;
    const rand = () => {
      seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5;
      return (seed >>> 0) / 0xffffffff;
    };

    const grid = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, () => {
        const v = rand();
        return (r === 0 || r === 6)
          ? (v < 0.7 ? 0 : Math.ceil(v * 3))
          : (v < 0.35 ? 0 : v < 0.58 ? 1 : v < 0.75 ? 2 : v < 0.92 ? 3 : 4);
      })
    );

    const PAL = ['#161b22','#0e4429','#006d32','#26a641','#39d353'];

    /* serpentine path */
    const path = [];
    for (let r = 0; r < ROWS; r++) {
      if (r % 2 === 0) for (let c = 0; c < COLS; c++) path.push([r, c]);
      else             for (let c = COLS - 1; c >= 0; c--) path.push([r, c]);
    }

    const LEN = 14;
    let head = 0;
    const eaten = new Set();

    const rr = (x, y, r = 2.5) => {
      ctx.beginPath(); ctx.roundRect(x, y, S, S, r);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          rr(G + c * T, G + r * T);
          ctx.fillStyle = eaten.has(`${r},${c}`) ? '#0d1117' : PAL[grid[r][c]];
          ctx.fill();
        }

      const from = Math.max(0, head - LEN);
      for (let i = from; i <= head && i < path.length; i++) {
        const [r, c] = path[i];
        const t = (i - from) / LEN;
        const isH = i === head;
        rr(G + c * T, G + r * T, isH ? 5 : 2.5);
        ctx.fillStyle = isH
          ? '#57e879'
          : `rgba(57,211,83,${(0.2 + t * 0.8).toFixed(2)})`;
        ctx.fill();

        if (isH) {
          ctx.fillStyle = '#0d1117';
          ctx.beginPath(); ctx.arc(G + c * T + 3.5,   G + r * T + 3.5, 1.3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(G + c * T + S - 3.5, G + r * T + 3.5, 1.3, 0, Math.PI * 2); ctx.fill();
          const nx = path[Math.min(i + 1, path.length - 1)];
          if (nx) {
            ctx.strokeStyle = '#ff4466'; ctx.lineWidth = 1.5; ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(G + c * T + S / 2, G + r * T + S / 2);
            ctx.lineTo(G + c * T + S / 2 + (nx[1] - c) * 7, G + r * T + S / 2 + (nx[0] - r) * 7);
            ctx.stroke();
          }
        }
      }
    };

    let raf, last = 0;
    const loop = ts => {
      if (ts - last >= 55) {
        last = ts;
        if (head < path.length - 1) {
          head++;
          eaten.add(`${path[head][0]},${path[head][1]}`);
          if (head > LEN) eaten.delete(`${path[head - LEN - 1][0]},${path[head - LEN - 1][1]}`);
        } else { head = 0; eaten.clear(); }
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    draw();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%' }} />;
}

/* ── Main About component ──────────────────────────────── */
export default function About({ photoUrl }) {
  const age        = useLiveAge();
  const sectionRef = useRef(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding:   '110px 0',
        position:  'relative',   /* cat is absolute within here */
        zIndex:    1,
        minHeight: '100vh',
        overflow:  'hidden',     /* clip the cat to this section */
      }}
    >
      {/* Oneko cat — only inside About section */}
      <CatFollower sectionRef={sectionRef} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* ── About me text ───────────────────────────── */}
        <h2 style={{
          fontSize:     'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight:   700,
          color:        'var(--text)',
          marginBottom: '36px',
        }}>
          About me:
        </h2>

        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '72px' }}>

          {/* Left — bio lines */}
          <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '13px' }}>

            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text)' }}>
              I am currently{' '}
              <span style={{
                fontFamily:   "'Fira Code', monospace",
                color:        '#c084fc',
                background:   'rgba(192,132,252,0.1)',
                padding:      '2px 8px',
                borderRadius: '4px',
                fontSize:     '.93rem',
              }}>
                {age}
              </span>
              {' '}years old
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text)' }}>
              I'm an Engineering Student at{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>KEC Kalimati, Nepal</span>
              {' '}(Batch 079)
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text)' }}>
              I program in
              <Badge slug="c"      label="C"          color="#00BFFF" />
              <Badge slug="cpp"    label="C++"        color="#004488" />
              <Badge slug="python" label="Python"     color="#3776AB" />
              and
              <Badge slug="js"     label="JavaScript" color="#F7DF1E" />
              usually
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text)' }}>
              I like coding in my freetime, building cool projects, watching anime and gaming
            </p>

            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text)' }}>
              I also love{' '}
              <span style={{ color: 'var(--accent2)' }}>video editing</span>
              , travelling and cooking! 🍳
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {['Quick Learner ⚡','Problem Solver 🧠','Team Player 🤝','Creative 🎬'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — profile card */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{
              background:     'var(--glass)',
              border:         '1px solid var(--border)',
              borderRadius:   '20px',
              overflow:       'visible',    /* allow hat to overflow above */
              backdropFilter: 'blur(14px)',
              width:          '230px',
              textAlign:      'center',
              boxShadow:      '0 8px 32px var(--shadow)',
              marginTop:      '40px',      /* push card down so hat has room */
            }}>

              {/* Photo banner — taller, face-focused */}
              <div style={{
                width:    '100%',
                height:   '210px',
                overflow: 'visible',   /* let hat stick out above */
                position: 'relative',
              }}>
                {/* ── Luffy straw hat floating above the head ── */}
                <img
                  src={strawHat}
                  alt="Straw Hat"
                  style={{
                    position:  'absolute',
                    top:       '-38px',
                    left:      '50%',
                    transform: 'translateX(-48%) rotate(-8deg)',
                    width:     '140px',
                    zIndex:    10,
                    filter:    'drop-shadow(0 6px 14px rgba(0,0,0,0.55))',
                    pointerEvents: 'none',
                  }}
                />

                {/* Photo (clip overflow within this inner div) */}
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', borderRadius: '20px 20px 0 0' }}>
                  <img
                    src={photoUrl || aboutPhoto}
                    alt="Janak Rokaya"
                    style={{
                      width:          '100%',
                      height:         '100%',
                      objectFit:      'cover',
                      objectPosition: '50% 25%',
                      display:        'block',
                      filter:         'brightness(1.05) contrast(1.02)',
                    }}
                    onError={e => { e.target.src = aboutPhoto; }}
                  />
                  {/* Gradient fade into card body */}
                  <div style={{
                    position:   'absolute',
                    bottom:     0,
                    left:       0,
                    right:      0,
                    height:     '60px',
                    background: 'linear-gradient(to bottom, transparent, var(--glass))',
                  }} />
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ fontWeight: 700, fontSize: '.98rem', marginBottom: '6px' }}>
                  Janak Rokaya
                </div>
                <div style={{ color: 'var(--text2)', fontSize: '.76rem', marginBottom: '4px', letterSpacing: '0.03em' }}>
                  @james0075k
                </div>
                <p style={{ color: 'var(--text2)', fontSize: '.78rem', lineHeight: 1.6, marginBottom: '12px' }}>
                  quick learner · curious engineer<br />
                  <span style={{ color: 'var(--accent2)', fontSize: '.74rem' }}>⚓ future pirate king of devs</span>
                </p>
                <div style={{
                  display:         'inline-flex',
                  alignItems:      'center',
                  gap:             '6px',
                  background:      'rgba(0,255,136,0.08)',
                  border:          '1px solid rgba(0,255,136,0.25)',
                  borderRadius:    '20px',
                  padding:         '4px 12px',
                  fontSize:        '.73rem',
                  fontWeight:      600,
                  color:           'var(--accent)',
                  letterSpacing:   '0.04em',
                }}>
                  <span style={{
                    width:        '6px',
                    height:       '6px',
                    borderRadius: '50%',
                    background:   'var(--accent)',
                    boxShadow:    '0 0 6px var(--accent)',
                    animation:    'blink-cur 1.6s infinite',
                    flexShrink:   0,
                  }} />
                  OPEN TO WORK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Snake activity graph ─────────────────────── */}
        <div>
          <h3 style={{
            fontSize:     '1.15rem',
            fontWeight:   600,
            color:        'var(--text)',
            marginBottom: '20px',
            display:      'flex',
            alignItems:   'center',
            gap:          '12px',
            flexWrap:     'wrap',
          }}>
            Snake activity graph:
            <span style={{ color: 'var(--text2)', fontSize: '.8rem', fontWeight: 400 }}>
              github.com/james0075k
            </span>
          </h3>

          <div style={{
            background:     'rgba(13,17,23,0.65)',
            border:         '1px solid var(--border)',
            borderRadius:   '14px',
            padding:        '20px 22px',
            backdropFilter: 'blur(8px)',
            display:        'inline-block',
            maxWidth:       '100%',
            overflowX:      'auto',
          }}>
            <SnakeGraph />

            {/* Legend */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              marginTop: '12px', justifyContent: 'flex-end',
              fontSize: '.72rem', color: 'var(--text2)',
            }}>
              Less
              {['#161b22','#0e4429','#006d32','#26a641','#39d353'].map(c => (
                <div key={c} style={{ width: '11px', height: '11px', borderRadius: '2px', background: c }} />
              ))}
              More
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
