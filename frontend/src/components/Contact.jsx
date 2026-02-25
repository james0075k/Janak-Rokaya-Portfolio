import { useState } from 'react';

const MY_EMAIL = 'rokayajanak505@gmail.com';

/* ── Open Gmail compose directly ─────────────────────────── */
const openGmail = ({ name, email, message }) => {
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(
    `Hi Janak,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
  );
  window.open(
    `https://mail.google.com/mail/?view=cm&to=${MY_EMAIL}&su=${subject}&body=${body}`,
    '_blank'
  );
};

/* ── macOS traffic-light dots ───────────────────────────── */
function TrafficLights() {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
    </div>
  );
}

/* ── Terminal window wrapper ────────────────────────────── */
function TermWindow({ title, badge, children }) {
  return (
    <div style={{
      background:   '#111827',
      border:       '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      overflow:     'hidden',
      flex:         '1 1 320px',
      minWidth:     0,
    }}>
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '12px 18px',
        borderBottom:   '1px solid rgba(255,255,255,0.07)',
        background:     '#1a2332',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TrafficLights />
          <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '.82rem', color: 'rgba(255,255,255,0.55)' }}>
            {title}
          </span>
        </div>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '.72rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          {badge}
        </span>
      </div>
      <div style={{ padding: '28px 26px' }}>{children}</div>
    </div>
  );
}

/* ── Info row ────────────────────────────────────────────── */
function InfoRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '16px',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '.88rem', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '.9rem', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

/* ── SVG social icons ────────────────────────────────────── */
const SOCIALS = [
  {
    label: 'GitHub',
    href:  'https://github.com/james0075k',
    color: '#8b949e',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/james.oo.7',
    color: '#e1306c',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href:  'https://twitter.com/james007',
    color: '#1da1f2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/in/YOUR-LINKEDIN',
    color: '#0a66c2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href:  'https://wa.me/YOUR-NUMBER',
    color: '#25d366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href:  `mailto:${MY_EMAIL}`,
    color: '#ea4335',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

/* ── Form field ──────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{
        display: 'block', fontSize: '.82rem',
        color: 'rgba(255,255,255,0.5)', marginBottom: '7px',
        fontFamily: "'Fira Code', monospace",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 14px',
  background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '6px', color: 'rgba(255,255,255,0.85)',
  fontSize: '.9rem', fontFamily: "'Fira Code', monospace",
  outline: 'none', transition: 'border-color .25s', boxSizing: 'border-box',
};

/* ── Main ────────────────────────────────────────────────── */
export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    /* Open Gmail compose directly */
    openGmail(form);

    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700,
          textAlign: 'center', marginBottom: '52px', color: 'var(--accent)',
        }}>
          Contact
        </h2>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'stretch' }}>

          {/* ── LEFT ── */}
          <TermWindow title="janak@portfolio:~ contact" badge="GET IN TOUCH">
            <h3 style={{
              fontSize: '1.35rem', fontWeight: 700,
              color: 'var(--accent)', marginBottom: '14px',
            }}>
              Let's work together
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '.92rem', lineHeight: 1.8, marginBottom: '28px' }}>
              I'm open to project work, collaborations, or just a friendly chat
              about tech, gaming, or video editing. Send a message and I'll get
              back to you as soon as I can.
            </p>

            <InfoRow label="Email" value={
              <a href={`mailto:${MY_EMAIL}`}
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                {MY_EMAIL}
              </a>
            } />
            <InfoRow label="Location" value="Kalimati, Kathmandu, Nepal 🇳🇵" />

            {/* Socials — icons only */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', paddingTop: '16px', gap: '16px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '.88rem', flexShrink: 0 }}>
                Socials
              </span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    style={{
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      width:        '38px',
                      height:       '38px',
                      borderRadius: '8px',
                      background:   'rgba(255,255,255,0.05)',
                      border:       '1px solid rgba(255,255,255,0.08)',
                      color:        'rgba(255,255,255,0.5)',
                      transition:   'all .2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color       = s.color;
                      e.currentTarget.style.borderColor = s.color + '88';
                      e.currentTarget.style.background  = s.color + '18';
                      e.currentTarget.style.transform   = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color       = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform   = 'none';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </TermWindow>

          {/* ── RIGHT ── */}
          <TermWindow title="send_message.sh" badge="COMPOSE">
            <form onSubmit={handleSubmit}>
              <Field label="Name">
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </Field>

              <Field label="Email">
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="Your email" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </Field>

              <Field label="Message">
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Write a brief message ..." required rows={6}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
              </Field>

              {/* Gmail note */}
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '.75rem', marginBottom: '14px', fontFamily: "'Fira Code', monospace" }}>
                # opens Gmail compose → {MY_EMAIL}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '14px' }}>
                {status === 'sent' && (
                  <span style={{ color: '#22c55e', fontSize: '.85rem' }}>
                    ✅ Opening Gmail...
                  </span>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '12px 28px',
                    background: status === 'sent' ? '#22c55e' : 'var(--accent)',
                    border: 'none', borderRadius: '7px',
                    color: '#000', fontSize: '.95rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'opacity .2s, transform .2s',
                    fontFamily: "'Inter', sans-serif",
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  {/* Gmail icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  {status === 'sent' ? 'Sent ✓' : 'Send Message'}
                </button>
              </div>
            </form>
          </TermWindow>

        </div>
      </div>
    </section>
  );
}
