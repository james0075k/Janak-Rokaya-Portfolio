import { useState, useCallback } from 'react';

/* ── Skillicons.dev image icon ──────────────────────────── */
const SI = 'https://skillicons.dev/icons?i=';

function Icon({ slug, name, size = 20 }) {
  return (
    <img
      src={`${SI}${slug}`}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: 'contain', flexShrink: 0, display: 'block' }}
      onError={e => { e.target.style.display = 'none'; }}
    />
  );
}

/* ── Data ───────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'FRONTEND',
    color: '#E44D26',
    skills: [
      { name: 'HTML',         slug: 'html'       },
      { name: 'CSS',          slug: 'css'        },
      { name: 'JavaScript',   slug: 'js'         },
      { name: 'React',        slug: 'react'      },
    ],
  },
  {
    label: 'BACKEND',
    color: '#68A063',
    skills: [
      { name: 'Node.js',      slug: 'nodejs'     },
      { name: 'Express',      slug: 'express'    },
    ],
  },
  {
    label: 'DATABASES',
    color: '#47A248',
    skills: [
      { name: 'MongoDB',      slug: 'mongodb'    },
      { name: 'MySQL',        slug: 'mysql'      },
    ],
  },
  {
    label: 'LANGUAGES',
    color: '#00BFFF',
    skills: [
      { name: 'C',            slug: 'c'          },
      { name: 'C++',          slug: 'cpp'        },
      { name: 'C#',           slug: 'cs'         },
      { name: 'Python',       slug: 'python'     },
    ],
  },
  {
    label: 'TOOLS',
    color: '#F05032',
    skills: [
      { name: 'Git',          slug: 'git'        },
      { name: 'GitHub',       slug: 'github'     },
      { name: 'Docker',       slug: 'docker'     },
      { name: 'VS Code',      slug: 'vscode'     },
    ],
  },
  {
    label: 'DESIGN',
    color: '#31A8FF',
    skills: [
      { name: 'Photoshop',    slug: 'ps'         },
      { name: 'Premiere Pro', slug: 'pr'         },
    ],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap(c => c.skills);

/* ── Vibrant play-mode fill colors ─────────────────────── */
const PLAY_COLORS = [
  '#7C3AED','#F59E0B','#10B981','#EF4444','#3B82F6',
  '#EC4899','#8B5CF6','#F97316','#0891B2','#65A30D',
  '#DC2626','#7C2D12','#1D4ED8','#15803D','#A21CAF',
];

/* ── Grid-dots icon ─────────────────────────────────────── */
function GridDots({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      {[0, 4, 8].map(cy =>
        [0, 4, 8].map(cx => (
          <rect key={`${cx}-${cy}`} x={cx} y={cy} width="2" height="2" rx="0.4" fill={color} />
        ))
      )}
    </svg>
  );
}

/* ── Toggle switch ──────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '10px',
        background: 'none',
        border:     'none',
        cursor:     'pointer',
        padding:    0,
      }}
    >
      <span style={{ color: 'var(--text)', fontSize: '.9rem' }}>Play mode</span>
      <div style={{
        width:        '46px',
        height:       '24px',
        borderRadius: '50px',
        background:   on ? '#3B82F6' : 'var(--skill-bg)',
        border:       '1px solid var(--border)',
        position:     'relative',
        transition:   'background .25s',
        flexShrink:   0,
      }}>
        <div style={{
          position:     'absolute',
          top:          '3px',
          left:         on ? '24px' : '3px',
          width:        '16px',
          height:       '16px',
          borderRadius: '50%',
          background:   '#fff',
          transition:   'left .25s',
          boxShadow:    '0 1px 4px rgba(0,0,0,.35)',
        }} />
      </div>
    </button>
  );
}

/* ── Skill chip ─────────────────────────────────────────── */
function SkillChip({ slug, name, playMode, playColor, onEnter, onLeave }) {
  const active = playMode && !!playColor;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '8px',
        padding:      playMode ? '16px 18px' : '9px 16px',
        borderRadius: '10px',
        background:   active
          ? playColor
          : 'rgba(255,255,255,0.04)',
        border:       `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
        backdropFilter: 'blur(8px)',
        cursor:       'default',
        transition:   'background .12s ease, transform .12s ease, border-color .2s, box-shadow .2s',
        transform:    active ? 'scale(1.05)' : 'scale(1)',
        userSelect:   'none',
        whiteSpace:   'nowrap',
      }}
      onMouseEnter={e => {
        if (onEnter) onEnter();
        if (!playMode) {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.boxShadow   = '0 0 14px var(--glow)';
        }
      }}
      onMouseLeave={e => {
        if (onLeave) onLeave();
        if (!playMode) {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow   = 'none';
        }
      }}
    >
      <Icon slug={slug} name={name} size={playMode ? 22 : 18} />
      <span style={{
        fontSize:   playMode ? '1rem' : '.9rem',
        fontWeight: active ? 700 : 400,
        color:      active ? '#000' : 'var(--text)',
        transition: 'color .12s',
      }}>
        {name}
      </span>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────── */
export default function Skills() {
  const [playMode, setPlayMode] = useState(false);
  const [hoverMap, setHoverMap] = useState({});
  const timers = {};

  const handleEnter = useCallback((name) => {
    if (!playMode) return;
    clearTimeout(timers[name]);
    const color = PLAY_COLORS[Math.floor(Math.random() * PLAY_COLORS.length)];
    setHoverMap(prev => ({ ...prev, [name]: color }));
  }, [playMode]);

  const handleLeave = useCallback((name) => {
    if (!playMode) return;
    timers[name] = setTimeout(() => {
      setHoverMap(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }, 340);
  }, [playMode]);

  const togglePlay = () => {
    setPlayMode(v => !v);
    setHoverMap({});
  };

  return (
    <section
      id="skills"
      className="section"
      style={{ background: 'transparent' }}   /* ← transparent */
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   playMode ? '12px' : '48px',
          flexWrap:       'wrap',
          gap:            '16px',
        }}>
          <h2 style={{
            fontSize:   'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color:      'var(--text)',
          }}>
            Skills
          </h2>
          <Toggle on={playMode} onChange={togglePlay} />
        </div>

        {/* Play hint */}
        {playMode && (
          <p style={{
            color:        '#60A5FA',
            fontStyle:    'italic',
            fontSize:     '.92rem',
            marginBottom: '36px',
            animation:    'fadeUp .35s ease both',
          }}>
            move your cursor over the items quickly to see satisfying color animation.
          </p>
        )}

        {/* ── Normal mode ──────────────────────────────── */}
        {!playMode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '38px' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.label} style={{ animation: 'fadeUp .5s ease both' }}>
                {/* Category label */}
                <div style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '8px',
                  marginBottom: '16px',
                }}>
                  <GridDots color={cat.color} />
                  <span style={{
                    fontSize:      '.78rem',
                    fontWeight:    700,
                    letterSpacing: '0.13em',
                    color:         cat.color,
                  }}>
                    {cat.label}
                  </span>
                </div>

                {/* Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cat.skills.map(skill => (
                    <SkillChip
                      key={skill.name}
                      slug={skill.slug}
                      name={skill.name}
                      playMode={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Play mode grid ────────────────────────────── */}
        {playMode && (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap:                 '10px',
            animation:           'fadeUp .35s ease both',
          }}>
            {ALL_SKILLS.map(skill => (
              <SkillChip
                key={skill.name}
                slug={skill.slug}
                name={skill.name}
                playMode={true}
                playColor={hoverMap[skill.name] || null}
                onEnter={() => handleEnter(skill.name)}
                onLeave={() => handleLeave(skill.name)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
