import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  mainSection: { flex: 1, background: '#f0faf5', padding: '80px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', maxWidth: '1000px', width: '100%' },
  leftSide: { display: 'flex', flexDirection: 'column', gap: '24px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  leftTitle: { fontSize: '38px', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.2', margin: '8px 0 12px' },
  leftDesc: { fontSize: '16px', color: '#666', lineHeight: '1.7' },
  benefitList: { display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' },
  benefitItem: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  benefitIcon: { width: '36px', height: '36px', background: '#d4eddf', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 },
  benefitText: { fontSize: '14px', color: '#444', lineHeight: '1.5', paddingTop: '6px' },
  formBox: { background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' },
  formTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  formDesc: { fontSize: '14px', color: '#999', marginBottom: '28px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
  passwordBox: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#999' },
  forgotLink: { display: 'block', textAlign: 'right', fontSize: '13px', color: '#1a6b4a', fontWeight: '500', marginTop: '6px', textDecoration: 'none' },
  submitBtn: { width: '100%', padding: '14px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#eee' },
  dividerText: { fontSize: '13px', color: '#bbb' },
  registerRow: { textAlign: 'center', fontSize: '14px', color: '#666' },
  registerLink: { color: '#1a6b4a', fontWeight: '700', textDecoration: 'none' },
  errorBox: { background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' },
  errorText: { fontSize: '14px', color: '#cc0000' },
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', form);
      login(res.data.token, res.data.patient);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <section style={styles.mainSection}>
        <div style={styles.mainGrid}>

          <div style={styles.leftSide}>
            <div>
              <span style={styles.tag}>Patient Portal</span>
              <h1 style={styles.leftTitle}>Welcome Back to HomeoEase</h1>
              <p style={styles.leftDesc}>
                Login to manage your appointments, view prescriptions
                and track your health journey with Dr. Priyanka Singh.
              </p>
            </div>
            <div style={styles.benefitList}>
              {[
                { icon: '📅', text: 'Book and manage your appointments easily' },
                { icon: '💊', text: 'View your prescriptions and treatment plans' },
                { icon: '⭐', text: 'Share your experience and write reviews' },
                { icon: '📋', text: 'Track your health progress over time' },
              ].map((b) => (
                <div key={b.text} style={styles.benefitItem}>
                  <div style={styles.benefitIcon}>{b.icon}</div>
                  <div style={styles.benefitText}>{b.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.formBox}>
            <h2 style={styles.formTitle}>Patient Login</h2>
            <p style={styles.formDesc}>Enter your credentials to access your account.</p>

            {error && (
              <div style={styles.errorBox}>
                <p style={styles.errorText}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
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
                <Link to="/forgot-password" style={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>or</span>
                <div style={styles.dividerLine} />
              </div>

              <div style={styles.registerRow}>
                Don't have an account?{' '}
                <Link to="/register" style={styles.registerLink}>
                  Register here
                </Link>
              </div>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;