import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f0faf5' },
  leftPanel: { width: '45%', background: '#1a6b4a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 48px', color: 'white' },
  logoCircle: { width: '72px', height: '72px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '24px' },
  clinicName: { fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '4px' },
  clinicSub: { fontSize: '14px', color: '#a8d5bc', marginBottom: '48px' },
  panelTitle: { fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '12px', textAlign: 'center' },
  panelDesc: { fontSize: '15px', color: '#a8d5bc', lineHeight: '1.7', textAlign: 'center', marginBottom: '48px' },
  featureList: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' },
  featureItem: { display: 'flex', gap: '12px', alignItems: 'center' },
  featureIcon: { width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 },
  featureText: { fontSize: '14px', color: '#d4eddf' },
  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 48px' },
  formBox: { background: 'white', borderRadius: '20px', padding: '48px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)', width: '100%', maxWidth: '420px' },
  formTitle: { fontSize: '26px', fontWeight: '800', color: '#1a1a1a', marginBottom: '6px' },
  formDesc: { fontSize: '14px', color: '#999', marginBottom: '32px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '13px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border 0.2s' },
  passwordBox: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#999' },
  submitBtn: { width: '100%', padding: '14px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' },
  errorBox: { background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' },
  errorText: { fontSize: '14px', color: '#cc0000' },
  backLink: { display: 'block', textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#999', textDecoration: 'none' },
  badge: { display: 'inline-block', background: '#fff8e6', color: '#b07800', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '99px', marginBottom: '24px', border: '1px solid #f4d58d' },
};

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🌐 Fire real API request hitting your custom backend controller route
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials. Please try again.');
      }

      if (data.token) {
        // 🛡️ Save token securely under the exact key variable the dashboard targets!
        localStorage.setItem('adminToken', data.token);
        
        // Match your router mapping setup (redirecting smoothly to dashboard frame)
        navigate('/admin'); 
      } else {
        throw new Error('Authentication token missing from response structure.');
      }
    } catch (err) {
      console.error('Admin Login Failure Handler:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>

      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.logoCircle}>H</div>
        <div style={styles.clinicName}>HomeoEase Clinic</div>
        <div style={styles.clinicSub}>Chembur Camp, Mumbai</div>
        <div style={styles.panelTitle}>Doctor Admin Panel</div>
        <div style={styles.panelDesc}>
          Manage your clinic, appointments and patient records all from one simple dashboard.
        </div>
        <div style={styles.featureList}>
          {[
            { icon: '📊', text: 'View clinic statistics and patient count' },
            { icon: '📅', text: 'Manage and attend appointments' },
            { icon: '💊', text: 'Add prescriptions for patients' },
            { icon: '📋', text: 'View complete appointment history' },
          ].map((f) => (
            <div key={f.text} style={styles.featureItem}>
              <div style={f.featureIcon}>{f.icon}</div>
              <div style={styles.featureText}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel Form Layout */}
      <div style={styles.rightPanel}>
        <div style={styles.formBox}>
          <span style={styles.badge}>Admin Access Only</span>
          <h2 style={styles.formTitle}>Doctor Login</h2>
          <p style={styles.formDesc}>Enter your credentials to access the admin panel.</p>

          {error && (
            <div style={styles.errorBox}>
              <p style={styles.errorText}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                style={styles.input}
                type="text"
                name="username"
                placeholder="Enter admin username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordBox}>
                <input
                  style={styles.input}
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          <a href="/" style={styles.backLink}>
            Back to Patient Website
          </a>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;