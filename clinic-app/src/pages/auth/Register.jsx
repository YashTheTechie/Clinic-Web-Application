import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  mainSection: { flex: 1, background: '#f0faf5', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '60px', alignItems: 'center', maxWidth: '1000px', width: '100%' },
  leftSide: { display: 'flex', flexDirection: 'column', gap: '20px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  leftTitle: { fontSize: '36px', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.2', margin: '8px 0 12px' },
  leftDesc: { fontSize: '16px', color: '#666', lineHeight: '1.7' },
  stepList: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' },
  stepItem: { display: 'flex', gap: '14px', alignItems: 'flex-start' },
  stepNum: { width: '32px', height: '32px', background: '#1a6b4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px', flexShrink: 0 },
  stepText: { fontSize: '14px', color: '#444', lineHeight: '1.5', paddingTop: '6px' },
  formBox: { background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' },
  formTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  formDesc: { fontSize: '14px', color: '#999', marginBottom: '28px' },
  formGroup: { marginBottom: '18px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' },
  select: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', background: 'white', boxSizing: 'border-box' },
  passwordBox: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#999' },
  submitBtn: { width: '100%', padding: '14px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  loginRow: { textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '16px' },
  loginLink: { color: '#1a6b4a', fontWeight: '700', textDecoration: 'none' },
  errorBox: { background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' },
  errorText: { fontSize: '14px', color: '#cc0000' },
  successBox: { background: '#f0faf5', borderRadius: '16px', padding: '40px', textAlign: 'center' },
  successIcon: { fontSize: '56px', marginBottom: '16px' },
  successTitle: { fontSize: '22px', fontWeight: '700', color: '#1a6b4a', marginBottom: '8px' },
  successDesc: { fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '24px' },
};

const Register = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', age: '',
    gender: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/register', {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        age: form.age,
        gender: form.gender,
        password: form.password,
      });
      login(res.data.token, res.data.patient);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              <span style={styles.tag}>Join HomeoEase</span>
              <h1 style={styles.leftTitle}>Create Your Patient Account</h1>
              <p style={styles.leftDesc}>
                Register to book appointments, track your treatment
                and connect with Dr. Priyanka Singh easily.
              </p>
            </div>
            <div style={styles.stepList}>
              {[
                'Fill in your basic personal details',
                'Create a secure password for your account',
                'Book your first appointment instantly',
                'Track your health journey online',
              ].map((step, i) => (
                <div key={i} style={styles.stepItem}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  <div style={styles.stepText}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.formBox}>
            {submitted ? (
              <div style={styles.successBox}>
                <div style={styles.successIcon}>🎉</div>
                <div style={styles.successTitle}>Account Created Successfully!</div>
                <div style={styles.successDesc}>
                  Welcome to HomeoEase! Redirecting you to home page...
                </div>
              </div>
            ) : (
              <>
                <h2 style={styles.formTitle}>Patient Registration</h2>
                <p style={styles.formDesc}>Create your free account in just a few steps.</p>

                {error && (
                  <div style={styles.errorBox}>
                    <p style={styles.errorText}>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input style={styles.input} type="text" name="fullName" placeholder="Your full name" value={form.fullName} onChange={handleChange} required />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input style={styles.input} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Phone Number</label>
                      <input style={styles.input} type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Age</label>
                      <input style={styles.input} type="number" name="age" placeholder="Your age" value={form.age} onChange={handleChange} required />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Gender</label>
                    <select style={styles.select} name="gender" value={form.gender} onChange={handleChange} required>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.passwordBox}>
                      <input style={styles.input} type={showPass ? 'text' : 'password'} name="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                        {showPass ? '🙈' : '👁'}
                      </button>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Confirm Password</label>
                    <div style={styles.passwordBox}>
                      <input style={styles.input} type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Repeat your password" value={form.confirmPassword} onChange={handleChange} required />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? '🙈' : '👁'}
                      </button>
                    </div>
                  </div>

                  <button type="submit" style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <div style={styles.loginRow}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.loginLink}>Login here</Link>
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;