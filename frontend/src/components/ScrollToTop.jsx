import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
      style={{
        position:     'fixed',
        bottom:       '32px',
        right:        '32px',
        zIndex:       500,
        width:        '46px',
        height:       '46px',
        borderRadius: '50%',
        background:   'linear-gradient(135deg, var(--accent), var(--accent2))',
        border:       'none',
        cursor:       'pointer',
        fontSize:     '1.1rem',
        color:        '#000',
        fontWeight:   700,
        boxShadow:    '0 6px 20px var(--glow)',
        transition:   'all .25s',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        animation:    'scaleIn .3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform  = 'translateY(-4px) scale(1.1)';
        e.currentTarget.style.boxShadow  = '0 12px 30px var(--glow)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform  = 'none';
        e.currentTarget.style.boxShadow  = '0 6px 20px var(--glow)';
      }}
    >
      ↑
    </button>
  );
}
