import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },

  // Hero
  hero: { background: '#f0faf5', padding: '80px 24px', textAlign: 'center' },
  heroTitle: { fontSize: '42px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 16px' },
  heroDesc: { fontSize: '17px', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' },

  // Doctor
  doctorSection: { padding: '80px 0', background: 'white' },
  doctorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
  doctorImageBox: { borderRadius: '24px', overflow: 'hidden', background: '#d4eddf' },
  doctorImage: { width: '100%', height: '500px', objectFit: 'cover' },
  doctorTag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  doctorName: { fontSize: '38px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 4px' },
  doctorDeg: { fontSize: '16px', color: '#f4a535', fontWeight: '600', marginBottom: '20px' },
  doctorDesc: { fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '16px' },
  doctorStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '28px' },
  doctorStatCard: { background: '#f0faf5', borderRadius: '12px', padding: '16px 20px' },
  doctorStatNum: { fontSize: '28px', fontWeight: '800', color: '#1a6b4a' },
  doctorStatLabel: { fontSize: '13px', color: '#666', marginTop: '2px' },

  // Mission
  missionSection: { padding: '80px 0', background: '#f9fafb' },
  sectionHeader: { textAlign: 'center', marginBottom: '48px' },
  sectionTitle: { fontSize: '36px', fontWeight: '700', color: '#1a1a1a', margin: '8px 0 12px' },
  sectionDesc: { fontSize: '16px', color: '#666', maxWidth: '560px', margin: '0 auto', lineHeight: '1.6' },
  missionGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  missionCard: { background: 'white', borderRadius: '16px', padding: '32px 28px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  missionIcon: { fontSize: '40px', marginBottom: '16px' },
  missionTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' },
  missionDesc: { fontSize: '14px', color: '#666', lineHeight: '1.7' },

  // Why Us
  whySection: { padding: '80px 0', background: 'white' },
  whyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' },
  whyList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  whyItem: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  whyIconBox: { width: '48px', height: '48px', background: '#f0faf5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 },
  whyTitle: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  whyDesc: { fontSize: '14px', color: '#666', lineHeight: '1.6' },
  whyImageBox: { borderRadius: '24px', overflow: 'hidden' },
  whyImage: { width: '100%', height: '420px', objectFit: 'cover' },

  // Timings
  timingSection: { padding: '80px 0', background: '#f9fafb' },
  timingGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '700px', margin: '0 auto' },
  timingCard: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', textAlign: 'center' },
  timingDay: { fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' },
  timingTime: { fontSize: '14px', color: '#1a6b4a', fontWeight: '600' },
  timingClosed: { fontSize: '14px', color: '#e53e3e', fontWeight: '600' },

  // CTA
  ctaSection: { background: '#1a6b4a', padding: '80px 0' },
  ctaInner: { textAlign: 'center' },
  ctaTitle: { fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '16px' },
  ctaDesc: { fontSize: '17px', color: '#a8d5bc', marginBottom: '32px' },
  btnAccent: { padding: '14px 36px', background: '#f4a535', color: 'white', borderRadius: '10px', fontSize: '15px', fontWeight: '700', display: 'inline-block', textDecoration: 'none' },
};

const missions = [
  { icon: '🌿', title: 'Natural Healing', desc: 'We believe in treating the whole person naturally without harmful chemicals or side effects.' },
  { icon: '🎯', title: 'Root Cause Treatment', desc: 'We do not just suppress symptoms. We find and treat the root cause for permanent lasting relief.' },
  { icon: '❤️', title: 'Patient First', desc: 'Every patient gets personalized attention and treatment tailored to their unique health needs.' },
];

const whyUs = [
  { icon: '🏆', title: '15+ Years of Experience', desc: 'Dr. Priyanka Singh has over 15 years of clinical experience treating thousands of patients successfully.' },
  { icon: '🔬', title: 'Classical Homeopathy', desc: 'We follow the original principles of classical homeopathy for the most effective and lasting results.' },
  { icon: '📋', title: 'Detailed Consultation', desc: 'Every patient gets a thorough consultation to understand their complete health history and symptoms.' },
  { icon: '📱', title: 'Follow Up Support', desc: 'We provide complete follow up support and monitor your progress throughout the entire treatment.' },
];

const AboutUs = () => {
  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Hero */}
      <section style={styles.hero}>
        <span style={styles.tag}>Our Story</span>
        <h1 style={styles.heroTitle}>About HomeoEase Clinic</h1>
        <p style={styles.heroDesc}>
          For over 15 years we have been healing patients naturally through the
          power of classical homeopathy. Our mission is to treat the root cause
          and restore lasting health naturally.
        </p>
      </section>

      {/* Doctor Profile */}
      <section style={styles.doctorSection}>
        <div style={styles.container}>
          <div style={styles.doctorGrid}>

            <div style={styles.doctorImageBox}>
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80"
                alt="Dr. Priyanka Singh"
                style={styles.doctorImage}
              />
            </div>

            <div>
              <span style={styles.doctorTag}>Meet Our Doctor</span>
              <h2 style={styles.doctorName}>Dr. Priyanka Singh</h2>
              <p style={styles.doctorDeg}>BHMS, MD (Homeopathy) - Mumbai University</p>
              <p style={styles.doctorDesc}>
                Dr. Priyanka Singh is a highly experienced classical homeopathic physician
                based in Chembur Camp, Mumbai. She completed her BHMS and MD in Homeopathy
                from Mumbai University with distinction.
              </p>
              <p style={styles.doctorDesc}>
                With over 15 years of dedicated practice, she has successfully treated
                thousands of patients suffering from chronic and acute conditions. Her
                compassionate approach and deep knowledge of classical homeopathy has
                made HomeoEase Clinic one of the most trusted clinics in Mumbai.
              </p>
              <p style={styles.doctorDesc}>
                She specializes in chronic diseases, skin disorders, womens health,
                child health and mental wellness. Every patient receives a thorough
                consultation and a personalized treatment plan.
              </p>
              <div style={styles.doctorStats}>
                {[
                  { num: '5000+', label: 'Patients Treated' },
                  { num: '15+', label: 'Years Experience' },
                  { num: '200+', label: 'Conditions Treated' },
                  { num: '95%', label: 'Success Rate' },
                ].map((s) => (
                  <div key={s.label} style={styles.doctorStatCard}>
                    <div style={styles.doctorStatNum}>{s.num}</div>
                    <div style={styles.doctorStatLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={styles.missionSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.tag}>Our Values</span>
            <h2 style={styles.sectionTitle}>What We Stand For</h2>
            <p style={styles.sectionDesc}>
              Everything we do is guided by our core principles of natural healing and patient care.
            </p>
          </div>
          <div style={styles.missionGrid}>
            {missions.map((m) => (
              <div key={m.title} style={styles.missionCard}>
                <div style={styles.missionIcon}>{m.icon}</div>
                <h3 style={styles.missionTitle}>{m.title}</h3>
                <p style={styles.missionDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={styles.whySection}>
        <div style={styles.container}>
          <div style={styles.whyGrid}>
            <div>
              <span style={styles.tag}>Why Choose Us</span>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'left', marginBottom: '32px' }}>
                Why Patients Trust Dr. Priyanka Singh
              </h2>
              <div style={styles.whyList}>
                {whyUs.map((item) => (
                  <div key={item.title} style={styles.whyItem}>
                    <div style={styles.whyIconBox}>{item.icon}</div>
                    <div>
                      <div style={styles.whyTitle}>{item.title}</div>
                      <div style={styles.whyDesc}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.whyImageBox}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                alt="Clinic"
                style={styles.whyImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Timings */}
      <section style={styles.timingSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.tag}>Visit Us</span>
            <h2 style={styles.sectionTitle}>Clinic Timings</h2>
            <p style={styles.sectionDesc}>
              We are located at Chembur Camp, Mumbai. Walk in or book an appointment online.
            </p>
          </div>
          <div style={styles.timingGrid}>
            <div style={styles.timingCard}>
              <div style={styles.timingDay}>Monday to Saturday</div>
              <div style={styles.timingTime}>Morning: 10:00 AM - 2:00 PM</div>
              <div style={{ height: '8px' }} />
              <div style={styles.timingTime}>Evening: 6:30 PM - 9:00 PM</div>
            </div>
            <div style={styles.timingCard}>
              <div style={styles.timingDay}>Sunday</div>
              <div style={styles.timingClosed}>Closed</div>
              <div style={{ height: '8px' }} />
              <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>
                For emergencies call us on our number
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <div style={{ ...styles.container, ...styles.ctaInner }}>
          <h2 style={styles.ctaTitle}>Ready to Begin Your Healing?</h2>
          <p style={styles.ctaDesc}>
            Book a consultation with Dr. Priyanka Singh today.
          </p>
          <Link to="/book-appointment" style={styles.btnAccent}>
            Book Appointment
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;