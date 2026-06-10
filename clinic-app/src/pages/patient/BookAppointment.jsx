import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  hero: { background: '#f0faf5', padding: '70px 24px', textAlign: 'center' },
  heroTitle: { fontSize: '42px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 16px' },
  heroDesc: { fontSize: '17px', color: '#666', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' },
  mainSection: { padding: '80px 0', background: 'white', flex: 1 },
  mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'flex-start' },
  infoStack: { display: 'flex', flexDirection: 'column', gap: '20px' },
  infoCard: { background: '#f9fafb', borderRadius: '16px', padding: '24px' },
  infoTitle: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px' },
  infoRow: { display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' },
  infoIcon: { fontSize: '18px', marginTop: '2px' },
  infoText: { fontSize: '14px', color: '#666', lineHeight: '1.6' },
  timingBox: { background: '#1a6b4a', borderRadius: '16px', padding: '24px' },
  timingTitle: { fontSize: '15px', fontWeight: '700', color: 'white', marginBottom: '16px' },
  timingRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  timingDay: { fontSize: '14px', color: '#a8d5bc' },
  timingTime: { fontSize: '13px', color: 'white', fontWeight: '600' },
  noteCard: { background: '#fff8e6', borderRadius: '16px', padding: '20px', border: '1px solid #f4d58d' },
  noteTitle: { fontSize: '14px', fontWeight: '700', color: '#b07800', marginBottom: '8px' },
  noteText: { fontSize: '13px', color: '#8a6000', lineHeight: '1.6' },
  formBox: { background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)' },
  formTitle: { fontSize: '24px', fontWeight: '700', color: '#1a1a1a', marginBottom: '6px' },
  formDesc: { fontSize: '14px', color: '#999', marginBottom: '28px' },
  formGroup: { marginBottom: '20px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', transition: 'border 0.2s', boxSizing: 'border-box' },
  select: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', background: 'white', boxSizing: 'border-box', cursor: 'pointer' },
  textarea: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px', boxSizing: 'border-box' },
  submitBtn: { width: '100%', padding: '14px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  successBox: { background: '#f0faf5', borderRadius: '16px', padding: '40px', textAlign: 'center' },
  successIcon: { fontSize: '56px', marginBottom: '16px' },
  successTitle: { fontSize: '22px', fontWeight: '700', color: '#1a6b4a', marginBottom: '8px' },
  successDesc: { fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '24px' },
  successBtn: { padding: '12px 28px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
};

const services = [
  'Chronic Diseases', 'Skin Disorders', 'Child Health', 'Womens Health',
  'Mental Wellness', 'Immunity Boost', 'Joint and Bone', 'Respiratory Health',
  'Digestive Health', 'Eye Disorders', 'Dental and Oral', 'Acute Diseases', 'Other',
];

const slots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', age: '', gender: '',
    service: '', date: '', slot: '', issue: '', duration: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { patient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patient) {
      alert('Please log in as a patient to schedule an appointment.');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const formattedPayload = {
        ...form,
        age: Number(form.age) // Cast to safe numerical representation
      };
      
      await axiosInstance.post('/appointments/book', formattedPayload);
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', age: '', gender: '', service: '', date: '', slot: '', issue: '', duration: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed. Please check server connections.');
    } finally {
      setLoading(false);
    }
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-CA');
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <section style={styles.hero}>
        <span style={styles.tag}>Schedule a Visit</span>
        <h1 style={styles.heroTitle}>Book an Appointment</h1>
        <p style={styles.heroDesc}>
          Fill in your details below to book a consultation with Dr. Priyanka Singh at HomeoEase Clinic, Chembur Camp, Mumbai.
        </p>
      </section>

      <section style={styles.mainSection}>
        <div style={styles.container}>
          <div style={styles.mainGrid}>

            {/* Left Info Column */}
            <div style={styles.infoStack}>
              <div style={styles.infoCard}>
                <div style={styles.infoTitle}>Clinic Information</div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>📍</span>
                  <span style={styles.infoText}>HomeoEase Clinic, Chembur Camp, Mumbai - 400074</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>👩‍⚕️</span>
                  <span style={styles.infoText}>Dr. Priyanka Singh - BHMS, MD (Homeopathy)</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoIcon}>📞</span>
                  <span style={styles.infoText}>+91 98765 43210</span>
                </div>
              </div>

              <div style={styles.timingBox}>
                <div style={styles.timingTitle}>Available Timings</div>
                {[
                  { day: 'Mon - Sat Morning', time: '10:00 AM - 2:00 PM' },
                  { day: 'Mon - Sat Evening', time: '6:30 PM - 9:00 PM' },
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

              <div style={styles.noteCard}>
                <div style={styles.noteTitle}>Please Note</div>
                <div style={styles.noteText}>
                  - First consultation takes 45-60 minutes.<br />
                  - Follow up consultations take 20-30 minutes.<br />
                  - Please bring any previous reports or prescriptions.<br />
                  - Appointment confirmation will be sent via phone call.
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div style={styles.formBox}>
              {submitted ? (
                <div style={styles.successBox}>
                  <div style={styles.successIcon}>✅</div>
                  <div style={styles.successTitle}>Appointment Booked Successfully!</div>
                  <div style={styles.successDesc}>
                    Thank you! Your appointment request has been received. Dr. Priyanka Singh will confirm your appointment via phone call within 2 hours.
                  </div>
                  <button style={styles.successBtn} onClick={() => setSubmitted(false)}>
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={styles.formTitle}>Appointment Details</h2>
                  <p style={styles.formDesc}>All fields marked are required. We will confirm via call.</p>

                  <form onSubmit={handleSubmit}>
                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input style={styles.input} type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number</label>
                        <input style={styles.input} type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} required />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email Address</label>
                      <input style={styles.input} type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Age</label>
                        <input style={styles.input} type="number" name="age" placeholder="Your age" value={form.age} onChange={handleChange} required />
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
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Service Required</label>
                      <select style={styles.select} name="service" value={form.service} onChange={handleChange} required>
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Preferred Date</label>
                        <input style={styles.input} type="date" name="date" min={getTodayDate()} value={form.date} onChange={handleChange} required />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Preferred Time Slot</label>
                        <select style={styles.select} name="slot" value={form.slot} onChange={handleChange} required>
                          <option value="">Select a slot</option>
                          {slots.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Main Health Issue</label>
                      <textarea
                        style={styles.textarea}
                        name="issue"
                        placeholder="Describe your symptoms and since when..."
                        value={form.issue}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Duration of Problem</label>
                      <input style={styles.input} type="text" name="duration" placeholder="e.g. 2 months, 1 year" value={form.duration} onChange={handleChange} required />
                    </div>

                    <button
                      type="submit"
                      style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
                      disabled={loading}
                    >
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;