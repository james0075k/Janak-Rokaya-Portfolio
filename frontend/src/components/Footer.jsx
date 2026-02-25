/* SVG icons — no emoji, clean minimal style */
const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const SOCIALS = [
  { Icon: GithubIcon,    href: 'https://github.com/james0075k',        label: 'GitHub'    },
  { Icon: InstagramIcon, href: 'https://instagram.com/james.oo.7',     label: 'Instagram' },
  { Icon: TwitterIcon,   href: 'https://twitter.com/james007',          label: 'Twitter'   },
  { Icon: LinkedInIcon,  href: 'https://linkedin.com/in/YOUR-LINKEDIN', label: 'LinkedIn'  },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop:  '1px solid var(--border)',
      position:   'relative',
      zIndex:     1,
    }}>
      {/* Main content */}
      <div style={{
        maxWidth: '720px',
        margin:   '0 auto',
        padding:  '100px 32px 60px',
      }}>

        {/* Heading */}
        <h2 style={{
          fontSize:    'clamp(1.7rem, 3.5vw, 2.4rem)',
          fontWeight:  700,
          color:       'var(--accent)',
          marginBottom: '20px',
          lineHeight:  1.2,
        }}>
          Have a question? 🤔
        </h2>

        {/* Body text */}
        <p style={{
          color:       'var(--text2)',
          fontSize:    '1rem',
          lineHeight:  1.85,
          maxWidth:    '520px',
          marginBottom: '44px',
        }}>
          I'd love to hear from you! Whether you have a question, a project idea,
          or just want to say hello — drop me a message. Your thoughts matter,
          and I'm here to listen!
        </p>

        {/* Contact me link */}
        <a
          href="#contact"
          onClick={e => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            fontSize:      '1rem',
            fontWeight:    400,
            color:         'var(--text2)',
            letterSpacing: '0.08em',
            borderBottom:  '1px solid var(--border)',
            paddingBottom: '2px',
            transition:    'color .2s, border-color .2s',
            display:       'inline-block',
            marginBottom:  '44px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color       = 'var(--accent)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color       = 'var(--text2)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          Contact me
        </a>

        {/* Social icons row */}
        <div style={{
          display:    'flex',
          gap:        '20px',
          alignItems: 'center',
        }}>
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              style={{
                color:      'var(--text2)',
                transition: 'color .2s, transform .2s',
                display:    'flex',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color     = 'var(--text)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color     = 'var(--text2)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding:   '20px 32px',
        textAlign: 'center',
      }}>
        <p style={{ color: 'var(--text2)', fontSize: '.82rem', marginBottom: '4px' }}>
          © {new Date().getFullYear()} Copyright by Janak Rokaya
        </p>
        <p style={{ color: 'var(--text2)', fontSize: '.75rem', opacity: 0.5 }}>
          v 1.0.0
        </p>
      </div>
    </footer>
  );
}
