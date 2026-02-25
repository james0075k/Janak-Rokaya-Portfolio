import { useEffect, useState } from 'react';

/*
  Bond 007 Splash — Timeline
  ─────────────────────────────────────────────
  0.0s  barrel    — gun-barrel iris opens, we look down the rifled bore
  1.1s  bullet    — bullet animates toward camera (zoom + flash rings)
  1.65s bang      — full-screen muzzle-flash explosion
  2.05s title     — iris expands; "JAMES" swooshes in, "007" pops
  3.80s hold      — gold glow pulse
  4.60s exit      — iris closes to a point → black
  5.50s           — onComplete fires
  ─────────────────────────────────────────────
*/

/* Fixed drip positions (no Math.random — avoids re-render jitter) */
const DRIPS = [
  { left: '40%', delay: '0ms',   w: '2px',   h: '210px' },
  { left: '48%', delay: '55ms',  w: '1.5px', h: '260px' },
  { left: '55%', delay: '110ms', w: '2.5px', h: '190px' },
  { left: '44%', delay: '175ms', w: '1px',   h: '240px' },
  { left: '52%', delay: '80ms',  w: '2px',   h: '175px' },
];

const RIFLE_ANGLES = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165];

/* ── Gun barrel SVG ──────────────────────────────── */
function GunBarrel({ firing }) {
  return (
    <svg
      width="300" height="300"
      viewBox="0 0 300 300"
      style={{ display: 'block', filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.08))' }}
    >
      <defs>
        <radialGradient id="bBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1e1e1e"/>
          <stop offset="72%"  stopColor="#101010"/>
          <stop offset="100%" stopColor="#000"/>
        </radialGradient>
        <radialGradient id="bFlash" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff"  stopOpacity="1"/>
          <stop offset="40%"  stopColor="#ffcc00" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* ── Barrel interior ── */}
      <circle cx="150" cy="150" r="146" fill="url(#bBg)"/>

      {/* ── White outer ring ── */}
      <circle cx="150" cy="150" r="146" fill="none" stroke="#ffffff" strokeWidth="8"/>

      {/* ── Inner ring details ── */}
      <circle cx="150" cy="150" r="134" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"/>
      <circle cx="150" cy="150" r="118" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>

      {/* ── Spinning rifling grooves ── */}
      <g style={{ transformOrigin: '150px 150px', animation: 'bondSpinRifle 5s linear infinite' }}>
        {RIFLE_ANGLES.map(a => (
          <line
            key={a}
            x1="150" y1="4" x2="150" y2="296"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1.5"
            transform={`rotate(${a} 150 150)`}
          />
        ))}
      </g>

      {/* ── Depth rings — perspective ── */}
      <circle cx="150" cy="150" r="70"  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="150" cy="150" r="45"  fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <circle cx="150" cy="150" r="26"  fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>

      {/* ── Bullet / muzzle flash ── */}
      {firing ? (
        /* bullet fires — two animated circles zooming out */
        <>
          <circle cx="150" cy="150" fill="url(#bFlash)">
            <animate attributeName="r"       values="10;190"  dur="0.55s" fill="freeze"/>
            <animate attributeName="opacity" values="1;0"     dur="0.55s" fill="freeze"/>
          </circle>
          <circle cx="150" cy="150" fill="rgba(255,200,0,0.35)">
            <animate attributeName="r"       values="28;200"  dur="0.55s" begin="0.04s" fill="freeze"/>
            <animate attributeName="opacity" values="0.7;0"   dur="0.55s" begin="0.04s" fill="freeze"/>
          </circle>
        </>
      ) : (
        /* static bullet dot with subtle glow */
        <>
          <circle cx="150" cy="150" r="18" fill="rgba(255,255,255,0.06)"/>
          <circle cx="150" cy="150" r="10" fill="rgba(255,255,255,0.4)"/>
          <circle cx="150" cy="150" r="5"  fill="#ffffff"/>
        </>
      )}
    </svg>
  );
}

/* ── Main SplashScreen ─────────────────────── */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('barrel');

  useEffect(() => {
    const plan = [
      ['bullet', 1100],
      ['bang',   1650],
      ['title',  2050],
      ['hold',   3800],
      ['exit',   4600],
    ];
    const ids = plan.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    const done = setTimeout(onComplete, 5500);
    return () => { ids.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  const afterBang  = !['barrel', 'bullet'].includes(phase);
  const showTitle  = ['title', 'hold', 'exit'].includes(phase);
  const isHold     = ['hold',  'exit'].includes(phase);
  const isExit     = phase === 'exit';

  /* Iris clip radius transitions */
  const irisR = isExit    ? '0px'
              : afterBang ? '150vmax'
              : '152px';   /* barrel aperture ≈ 304px diameter */

  const irisTr = isExit    ? 'clip-path .8s cubic-bezier(0.55,0,1,1)'
               : afterBang ? 'clip-path .38s ease'
               : 'none';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000', overflow: 'hidden',
    }}>
      <style>{KEYFRAMES}</style>

      {/* ══════════════════════════════════════
          IRIS-CLIPPED CONTENT
          (barrel during barrel phase,
           title card during title phase)
          ══════════════════════════════════════ */}
      <div style={{
        position:   'absolute', inset: 0,
        clipPath:   `circle(${irisR} at 50% 50%)`,
        transition: irisTr,
        background: '#000',
        display:    'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* ── Barrel view ── */}
        {!afterBang && (
          <div style={{ animation: 'bondFadeIn .4s ease' }}>
            <GunBarrel firing={phase === 'bullet'} />
          </div>
        )}

        {/* ── Title card ── */}
        {showTitle && (
          <div style={{
            position:       'absolute', inset: 0,
            background:     'radial-gradient(ellipse 80% 60% at 50% 50%, #0a0a0a 0%, #000 100%)',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            0,
          }}>

            {/* ── JAMES ── */}
            <div style={{
              fontFamily:    "'Inter', 'Helvetica Neue', sans-serif",
              fontSize:      'clamp(3.8rem, 11vw, 8rem)',
              fontWeight:    900,
              color:         '#ffffff',
              letterSpacing: '0.3em',
              lineHeight:    1,
              animation:     'bondJamesSwoosh .55s cubic-bezier(0.16,1,0.3,1) both',
              textShadow:    '0 0 80px rgba(255,255,255,0.18)',
              paddingRight:  '0.3em',   /* visually balance letter-spacing */
            }}>
              JAMES
            </div>

            {/* ── 007 ── */}
            <div style={{
              display:       'flex',
              fontFamily:    "'Fira Code', 'Courier New', monospace",
              fontSize:      'clamp(3rem, 9vw, 6rem)',
              fontWeight:    700,
              color:         '#FFD700',
              letterSpacing: '0.15em',
              marginTop:     '4px',
              animation:     isHold ? 'bondGold 2.2s ease-in-out infinite' : 'none',
            }}>
              {'007'.split('').map((c, i) => (
                <span key={i} style={{
                  display:   'inline-block',
                  animation: `bondPopIn .45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s both`,
                  paddingRight: i < 2 ? '0.15em' : 0,
                }}>
                  {c}
                </span>
              ))}
            </div>

            {/* ── Gold divider line ── */}
            <div style={{
              width:           '240px',
              height:          '1px',
              background:      'linear-gradient(90deg, transparent, #FFD700 25%, #FFD700 75%, transparent)',
              margin:          '22px 0 14px',
              transformOrigin: 'left center',
              animation:       'bondLineReveal .75s .2s ease both',
            }}/>

            {/* ── Handle ── */}
            <div style={{
              fontFamily:    "'Fira Code', monospace",
              fontSize:      'clamp(.72rem, 1.8vw, .88rem)',
              color:         'rgba(255,215,0,0.45)',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              animation:     'bondFadeIn .6s .45s ease both',
            }}>
              james0075k
            </div>

          </div>
        )}
      </div>

      {/* ══════════════════════════════
          MUZZLE FLASH (outside iris)
          ══════════════════════════════ */}
      {phase === 'bang' && (
        <div style={{
          position:   'fixed', inset: 0, zIndex: 20, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, #fffde7 0%, #ffcc00 20%, #ff6600 50%, transparent 72%)',
          animation:  'bondBangFlash .45s ease-out forwards',
        }}/>
      )}

      {/* ══════════════════════════════
          BLOOD DRIPS (outside iris)
          ══════════════════════════════ */}
      {afterBang && DRIPS.map((d, i) => (
        <div key={i} style={{
          position:        'fixed',
          top:             0, left: d.left,
          width:           d.w, height: d.h,
          background:      'linear-gradient(to bottom, #5c0000 0%, #cc0000 55%, transparent 100%)',
          borderRadius:    '0 0 5px 5px',
          transformOrigin: 'top center',
          animation:       `bondBloodFall .9s ${d.delay} cubic-bezier(.4,0,.6,1) both`,
          zIndex:          8,
          pointerEvents:   'none',
          opacity:         isExit ? 0 : 1,
          transition:      isExit ? 'opacity .5s ease' : 'none',
        }}/>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   CSS KEYFRAMES
   ════════════════════════════════════════════ */
const KEYFRAMES = `
  @keyframes bondSpinRifle {
    to { transform: rotate(360deg); }
  }

  @keyframes bondFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes bondBangFlash {
    0%   { opacity: 0; }
    10%  { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes bondBloodFall {
    from { transform: scaleY(0); opacity: 0;    }
    to   { transform: scaleY(1); opacity: 0.88; }
  }

  /* JAMES slides in fast from left with a skew + motion-blur feel */
  @keyframes bondJamesSwoosh {
    0%   { transform: translateX(-90px) skewX(-10deg); opacity: 0; filter: blur(10px); }
    65%  { transform: translateX(5px)   skewX(1deg);  opacity: 1; filter: blur(0); }
    100% { transform: translateX(0)     skewX(0deg);  opacity: 1; filter: blur(0); }
  }

  /* 007 digits spring-pop from below */
  @keyframes bondPopIn {
    0%   { transform: scale(0.2) translateY(30px) rotate(-12deg); opacity: 0; }
    70%  { transform: scale(1.1) translateY(-4px) rotate(2deg);  opacity: 1; }
    100% { transform: scale(1)   translateY(0)    rotate(0deg);  opacity: 1; }
  }

  /* Gold line draws from left to right */
  @keyframes bondLineReveal {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  /* Pulsing gold glow on 007 during hold */
  @keyframes bondGold {
    0%, 100% {
      text-shadow: 0 0 18px #FFD700, 0 0 36px rgba(255,215,0,0.55);
    }
    50% {
      text-shadow: 0 0 40px #FFD700, 0 0 80px rgba(255,215,0,0.75),
                   0 0 130px rgba(255,215,0,0.3);
    }
  }
`;
