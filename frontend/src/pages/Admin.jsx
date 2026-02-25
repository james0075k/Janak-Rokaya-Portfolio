import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Admin() {
  const [token,       setToken]       = useState(localStorage.getItem('admin_token') || '');
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [creds,       setCreds]       = useState({ username: '', password: '' });
  const [profile,     setProfile]     = useState(null);
  const [editData,    setEditData]    = useState({});
  const [photoFile,   setPhotoFile]   = useState(null);
  const [photoPreview,setPhotoPreview]= useState('');
  const [msg,         setMsg]         = useState('');
  const [loading,     setLoading]     = useState(false);
  const fileRef = useRef(null);

  // Verify token on mount
  useEffect(() => {
    if (!token) return;
    axios.post('/api/auth/verify', { token })
      .then(r => {
        if (r.data.valid) {
          setLoggedIn(true);
          fetchProfile(token);
        } else {
          localStorage.removeItem('admin_token');
          setToken('');
        }
      })
      .catch(() => setToken(''));
  }, []);

  const fetchProfile = async (t) => {
    const res = await axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${t || token}` }
    });
    setProfile(res.data);
    setEditData(res.data);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post('/api/auth/login', creds);
      const tk = res.data.token;
      localStorage.setItem('admin_token', tk);
      setToken(tk);
      setLoggedIn(true);
      await fetchProfile(tk);
      setMsg('✅ Logged in successfully!');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Login failed'));
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    setLoggedIn(false);
    setProfile(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async () => {
    if (!photoFile) return;
    setLoading(true);
    setMsg('');
    const fd = new FormData();
    fd.append('photo', photoFile);
    try {
      const res = await axios.post('/api/profile/photo', fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg('✅ Photo updated!');
      setProfile(res.data.profile);
      setPhotoPreview('');
      setPhotoFile(null);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Upload failed'));
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.put('/api/profile', editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setMsg('✅ Profile saved!');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Save failed'));
    }
    setLoading(false);
  };

  // ── Styles ────────────────────────────────────────────
  const card = {
    background:   'var(--glass)',
    border:       '1px solid var(--border)',
    borderRadius: '18px',
    padding:      '32px',
    backdropFilter: 'blur(12px)',
    marginBottom: '24px',
  };

  const fieldGroup = (label, key, type = 'text') => (
    <div style={{ marginBottom: '16px' }} key={key}>
      <label style={{ display: 'block', fontSize: '.82rem', color: 'var(--text2)', marginBottom: '6px' }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="input-field"
          value={editData[key] || ''}
          onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
          rows={3}
          style={{ resize: 'vertical' }}
        />
      ) : (
        <input
          className="input-field"
          type={type}
          value={editData[key] || ''}
          onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
        />
      )}
    </div>
  );

  return (
    <div style={{
      minHeight:  '100vh',
      background: 'var(--bg)',
      padding:    '100px 24px 60px',
      position:   'relative',
      zIndex:     1,
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              🔒 <span className="grad-text">Admin Panel</span>
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: '.9rem', marginTop: '4px' }}>
              Manage your portfolio content
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/" className="btn btn-outline" style={{ padding: '8px 18px', fontSize: '.85rem' }}>
              ← Portfolio
            </a>
            {loggedIn && (
              <button onClick={logout} className="btn" style={{
                padding: '8px 18px', fontSize: '.85rem',
                background: '#ff444420', border: '1px solid #ff4444', color: '#ff4444',
              }}>
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Status message */}
        {msg && (
          <div style={{
            padding: '12px 18px', borderRadius: '10px', marginBottom: '20px',
            background: msg.startsWith('✅') ? 'rgba(0,255,136,0.1)' : 'rgba(255,68,68,0.1)',
            border: `1px solid ${msg.startsWith('✅') ? 'var(--accent)' : '#ff4444'}`,
            color: msg.startsWith('✅') ? 'var(--accent)' : '#ff4444',
            fontSize: '.9rem',
          }}>
            {msg}
          </div>
        )}

        {/* ── Login form ─────────────────────────────────────── */}
        {!loggedIn ? (
          <div style={card}>
            <h2 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 700 }}>Login</h2>
            <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '.82rem', color: 'var(--text2)', marginBottom: '6px' }}>
                  Username
                </label>
                <input
                  className="input-field"
                  value={creds.username}
                  onChange={e => setCreds(p => ({ ...p, username: e.target.value }))}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.82rem', color: 'var(--text2)', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  className="input-field"
                  type="password"
                  value={creds.password}
                  onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ alignSelf: 'flex-start' }}
              >
                {loading ? '⏳ Logging in...' : '🔓 Login'}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* ── Photo upload ─────────────────────────────────── */}
            <div style={card}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700 }}>
                📷 Profile Photo
              </h2>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Current / preview photo */}
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%',
                  border: '3px solid var(--accent)',
                  overflow: 'hidden', flexShrink: 0,
                  boxShadow: '0 0 20px var(--glow)',
                }}>
                  <img
                    src={photoPreview || profile?.photoUrl || `https://ui-avatars.com/api/?name=Janak+Rokaya&size=120&background=00ff88&color=000&bold=true`}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                  <p style={{ color: 'var(--text2)', fontSize: '.85rem', marginBottom: '14px' }}>
                    Upload a new profile photo (max 5MB). Supports JPG, PNG, GIF, WebP.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="btn btn-outline"
                      style={{ padding: '8px 18px', fontSize: '.85rem' }}
                    >
                      📂 Choose Photo
                    </button>
                    {photoFile && (
                      <button
                        onClick={uploadPhoto}
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ padding: '8px 18px', fontSize: '.85rem' }}
                      >
                        {loading ? '⏳ Uploading...' : '⬆️ Upload'}
                      </button>
                    )}
                  </div>
                  {photoFile && (
                    <p style={{ color: 'var(--accent)', fontSize: '.8rem', marginTop: '8px' }}>
                      Selected: {photoFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Profile info editor ──────────────────────────── */}
            <div style={card}>
              <h2 style={{ marginBottom: '24px', fontSize: '1.1rem', fontWeight: 700 }}>
                ✏️ Profile Info
              </h2>
              {fieldGroup('Name',        'name'     )}
              {fieldGroup('Title',       'title'    )}
              {fieldGroup('Bio',         'bio',   'textarea')}
              {fieldGroup('Email',       'email', 'email')}
              {fieldGroup('GitHub URL',  'github'   )}
              {fieldGroup('Instagram',   'instagram')}
              {fieldGroup('Twitter',     'twitter'  )}
              {fieldGroup('LinkedIn',    'linkedin' )}
              <button
                onClick={saveProfile}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? '⏳ Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
