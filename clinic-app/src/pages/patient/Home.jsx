import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Home.css';

const services = [
  { icon: '🫀', title: 'Chronic Diseases', desc: 'Long-term relief from diabetes, hypertension, arthritis and more.' },
  { icon: '🌿', title: 'Skin Disorders', desc: 'Natural treatment for eczema, psoriasis, acne and allergies.' },
  { icon: '👶', title: 'Child Health', desc: 'Safe and gentle homeopathic care for infants and children.' },
  { icon: '👩', title: 'Womens Health', desc: 'Hormonal balance, PCOS, menstrual disorders and menopause care.' },
  { icon: '🧠', title: 'Mental Wellness', desc: 'Anxiety, depression, stress and sleep disorder treatment.' },
  { icon: '🛡', title: 'Immunity Boost', desc: 'Strengthen your immune system naturally and effectively.' },
];

const reviews = [
  { name: 'Priya Sharma', rating: 5, comment: 'Dr. treated my chronic migraine that no allopathic doctor could cure. Truly amazing results!', location: 'Mumbai' },
  { name: 'Rahul Mehta', rating: 5, comment: 'My son recurring fever stopped completely after homeopathic treatment. Highly recommended!', location: 'Pune' },
  { name: 'Sunita Patel', rating: 5, comment: 'I had severe skin allergy for 3 years. After 2 months of treatment my skin is completely clear!', location: 'Thane' },
];

const stats = [
  { label: 'Happy Patients', end: 5000, suffix: '+' },
  { label: 'Years Experience', end: 15, suffix: '+' },
  { label: 'Diseases Treated', end: 200, suffix: '+' },
  { label: 'Success Rate', end: 95, suffix: '%' },
];

const StatCard = ({ label, end, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (2000 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="stat-card">
      <div className="stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-badge">Natural Healing - Trusted Care</span>
              <h1 className="hero-title">
                Heal Naturally with <span className="text-primary">HomeoEase</span> Clinic
              </h1>
              <p className="hero-desc">
                Experience the power of classical homeopathy. We treat the root cause,
                not just the symptoms - bringing lasting relief through safe, gentle,
                and effective natural medicine.
              </p>
              <div className="hero-buttons">
                <Link to="/book-appointment" className="btn-primary">Book Appointment</Link>
                <Link to="/services" className="btn-secondary">Our Services</Link>
              </div>
              <div className="hero-badges">
                <span className="trust-badge">15 Plus Years Experience</span>
                <span className="trust-badge">5000 Plus Patients</span>
                <span className="trust-badge">Natural and Safe</span>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-box">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                  alt="Doctor"
                  className="hero-image"
                />
              </div>
              <div className="hero-floating-card">
                <div className="floating-icon">🏆</div>
                <div>
                  <div className="floating-title">95% Success Rate</div>
                  <div className="floating-sub">Trusted by patients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Treat</span>
            <h2 className="section-title">Our Specialised Services</h2>
            <p className="section-desc">
              We offer comprehensive homeopathic treatment for a wide range of acute and chronic conditions.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Patient Stories</span>
            <h2 className="section-title">What Our Patients Say</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.name} className="review-card">
                <div className="stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-comment">{review.comment}</p>
                <div className="reviewer">
                  <div className="reviewer-avatar">{review.name[0]}</div>
                  <div>
                    <div className="reviewer-name">{review.name}</div>
                    <div className="reviewer-location">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/reviews" className="btn-secondary">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Ready to Start Your Healing Journey?</h2>
          <p className="cta-desc">
            Book your appointment today and take the first step towards natural, lasting health.
          </p>
          <Link to="/book-appointment" className="btn-accent">Book Appointment Now</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;