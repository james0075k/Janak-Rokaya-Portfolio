import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    title:       'Cloud Call',
    emoji:       '☁️',
    status:      'ONGOING',
    statusColor: '#00ff88',
    description: 'A cloud-based communication platform designed for college use, enabling seamless messaging and calling between students and faculty.',
    tags:        ['React', 'Node.js', 'Express', 'MongoDB'],
    features:    null,
    github:      'https://github.com/james0075k/cloudcall',
    live:        null,
    gradient:    'linear-gradient(135deg, #00ff88, #00d4ff)',
  },
  {
    title:       'Portfolio Website',
    emoji:       '🌐',
    status:      'LIVE',
    statusColor: '#00d4ff',
    description: 'This very site — a fully custom React portfolio with a polished UI and interactive features.',
    tags:        ['React', 'Node.js', 'Express', 'MongoDB', 'Canvas API', 'Vite'],
    features: [
      '🧭 Smart auto-hide glass navbar with live date',
      '📸 Real photo integration (Hero + About)',
      '🌗 Dark / Light mode toggle',
      '🌊 Asteroid canvas + water ripple background',
      '🐱 Oneko pixel-cat follower (About section)',
      '🐍 Animated snake contribution graph',
      '✨ Splash screen with animated J logo',
      '🔐 Admin panel (CRUD profile & projects)',
    ],
    github:      'https://github.com/james0075k/webportfolio',
    live:        'https://james0075k.github.io',
    gradient:    'linear-gradient(135deg, #00d4ff, #9999FF)',
  },
  {
    title:       'Coming Soon...',
    emoji:       '🚀',
    status:      'PLANNING',
    statusColor: '#F7DF1E',
    description: 'Next project in planning. Currently exploring ideas around automation with Python and building useful tools for students.',
    tags:        ['Python', 'Automation', 'TBD'],
    features:    null,
    github:      null,
    live:        null,
    gradient:    'linear-gradient(135deg, #F7DF1E, #ff8800)',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="reveal glass-card"
      style={{
        padding:       '28px',
        display:       'flex',
        flexDirection: 'column',
        gap:           '14px',
        position:      'relative',
        overflow:      'hidden',
        transition:    'box-shadow .25s',
      }}
    >
      {/* Gradient accent bar */}
      <div style={{
        position:     'absolute',
        top:          0,
        left:         0,
        right:        0,
        height:       '3px',
        background:   project.gradient,
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>{project.emoji}</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h3>
        </div>
        <span style={{
          fontSize:      '.72rem',
          fontWeight:    700,
          padding:       '3px 10px',
          borderRadius:  '50px',
          border:        `1px solid ${project.statusColor}`,
          color:         project.statusColor,
          letterSpacing: '0.06em',
          flexShrink:    0,
        }}>
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--text2)', fontSize: '.9rem', lineHeight: 1.7, flex: 1 }}>
        {project.description}
      </p>

      {/* ── Features accordion (Portfolio card only) ── */}
      {project.features && (
        <div>
          <button
            onClick={() => setShowFeatures(v => !v)}
            style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '6px',
              background:    'none',
              border:        `1px solid var(--border)`,
              borderRadius:  '8px',
              padding:       '5px 12px',
              cursor:        'pointer',
              color:         'var(--text2)',
              fontSize:      '.78rem',
              fontWeight:    500,
              letterSpacing: '0.02em',
              transition:    'all .2s',
              marginBottom:  showFeatures ? '10px' : '0',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color       = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color       = 'var(--text2)';
            }}
          >
            <span style={{
              display:    'inline-block',
              transform:  showFeatures ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform .2s',
              fontSize:   '.7rem',
            }}>▶</span>
            {showFeatures ? 'Hide' : 'Show'} features ({project.features.length})
          </button>

          {showFeatures && (
            <ul style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '7px',
              padding:       '12px 14px',
              background:    'rgba(0,212,255,0.04)',
              border:        '1px solid rgba(0,212,255,0.12)',
              borderRadius:  '10px',
              animation:     'fadeUp .2s ease both',
            }}>
              {project.features.map(f => (
                <li key={f} style={{
                  fontSize:   '.8rem',
                  color:      'var(--text2)',
                  lineHeight: 1.5,
                  display:    'flex',
                  gap:        '8px',
                  alignItems: 'flex-start',
                }}>
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {project.tags.map(t => (
          <span key={t} className="tag" style={{ fontSize: '.76rem' }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ padding: '8px 18px', fontSize: '.85rem' }}
          >
            ⭐ GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: '.85rem' }}
          >
            🌐 Live Demo
          </a>
        )}
        {!project.github && !project.live && (
          <span style={{ color: 'var(--text2)', fontSize: '.85rem', alignSelf: 'center' }}>
            Coming soon...
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add('visible'),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title reveal" ref={titleRef}>Projects</h2>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap:                 '26px',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ color: 'var(--text2)', marginBottom: '18px', fontSize: '.95rem' }}>
            More projects on the way — stay tuned! 🔥
          </p>
          <a
            href="https://github.com/james0075k"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
