import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },

  // Hero
  hero: { background: '#f0faf5', padding: '70px 24px', textAlign: 'center' },
  heroTitle: { fontSize: '42px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 16px' },
  heroDesc: { fontSize: '17px', color: '#666', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' },

  // Main Section
  mainSection: { padding: '80px 0', background: 'white', flex: 1 },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '60px', alignItems: 'flex-start' },

  // Info Cards
  infoStack: { display: 'flex', flexDirection: 'column', gap: '20px' },
  infoCard: { background: '#f9fafb', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' },
  infoIconBox: { width: '48px', height: '48px', background: '#d4eddf', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 },
  infoTitle: { fontSize: '14px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  infoValue: { fontSize: '14px', color: '#666', lineHeight: '1.6' },
  infoLink: { fontSize: '14px', color: '#1a6b4a', fontWeight: '500', textDecoration: 'none' },

  // Timing Card
  timingCard: { background: '#1a6b4a', borderRadius: '16px', padding: '24px' },
  timingTitle: { fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '16px' },
  timingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  timingDay: { fontSize: '14px', color: '#a8d5bc', fontWeight: '500' },
  timingTime: { fontSize: '13px', color: 'white', fontWeight: '600', textAlign: 'right' },

  // Form
  formBox: { background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' },
  formTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  formDesc: { fontSize: '14px', color: '#999', marginBottom: '28px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', transition: 'border 0.2s', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px', boxSizing: 'border-box' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  submitBtn: { width: '100%', padding: '14px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'inherit' },

  // Map
  mapSection: { padding: '0 0 80px', background: 'white' },
  mapBox: { borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' },

  // Success
  successBox: { background: '#f0faf5', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '20px' },
  successText: { color: '#1a6b4a', fontWeight: '600', fontSize: '15px' },
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section style={styles.hero}>
        <span style={styles.tag}>Get In Touch</span>
        <h1 style={styles.heroTitle}>Contact Us</h1>
        <p style={styles.heroDesc}>
          Have a question or want to book an appointment? We are here to help.
          Reach out to us and we will get back to you shortly.
        </p>
      </section>

      {/* Main */}
      <section style={styles.mainSection}>
        <div style={styles.container}>
          <div style={styles.mainGrid}>

            {/* Left Info */}
            <div style={styles.infoStack}>
              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📍</div>
                <div>
                  <div style={styles.infoTitle}>Clinic Address</div>
                  <div style={styles.infoValue}>
                    HomeoEase Clinic, Chembur Camp,
                    Mumbai - 400074, Maharashtra
                  </div>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📞</div>
                <div>
                  <div style={styles.infoTitle}>Phone Number</div>
                  <a href="tel:+919876543210" style={styles.infoLink}>+91 98765 43210</a>
                </div>
              </div>

              <div style={styles.infoCard}>
                <div style={styles.infoIconBox}>📧</div>
                <div>
                  <div style={styles.infoTitle}>Email Address</div>
                  <a href="mailto:info@homeoease.com" style={styles.infoLink}>info@homeoease.com</a>
                </div>
              </div>

              <div style={styles.timingCard}>
                <div style={styles.timingTitle}>Clinic Timings</div>
                {[
                  { day: 'Monday - Saturday', time: '10:00 AM - 2:00 PM' },
                  { day: 'Monday - Saturday', time: '6:30 PM - 9:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((t, i) => (
                  <div key={i} style={styles.timingRow}>
                    <span style={styles.timingDay}>{t.day}</span>
                    <span style={{ ...styles.timingTime, color: t.time === 'Closed' ? '#ff8080' : 'white' }}>
                      {t.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div style={styles.formBox}>
              <h2 style={styles.formTitle}>Send Us a Message</h2>
              <p style={styles.formDesc}>Fill the form below and we will respond within 24 hours.</p>

              {submitted && (
                <div style={styles.successBox}>
                  <div style={styles.successText}>
                    Message sent successfully! We will contact you shortly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input
                      style={styles.input}
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input
                      style={styles.input}
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
                  <label style={styles.label}>Subject</label>
                  <input
                    style={styles.input}
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    style={styles.textarea}
                    name="message"
                    placeholder="Describe your health concern or query..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map */}
      <section style={styles.mapSection}>
        <div style={styles.container}>
          <div style={styles.mapBox}>
            <iframe
              title="HomeoEase Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4!2d72.8996!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNTMnNTguNiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;