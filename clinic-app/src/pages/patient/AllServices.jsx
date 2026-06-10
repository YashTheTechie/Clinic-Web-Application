import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './AllServices.css';

const allServices = [
  { icon: '🫀', title: 'Chronic Diseases', desc: 'Long-term relief from diabetes, hypertension, arthritis and thyroid disorders.', conditions: ['Diabetes', 'Hypertension', 'Arthritis', 'Thyroid'] },
  { icon: '🌿', title: 'Skin Disorders', desc: 'Natural and permanent treatment for all skin conditions without steroids.', conditions: ['Eczema', 'Psoriasis', 'Acne', 'Urticaria'] },
  { icon: '👶', title: 'Child Health', desc: 'Safe and gentle homeopathic care for infants, toddlers and children.', conditions: ['Recurring Fever', 'Bedwetting', 'Tonsillitis', 'ADHD'] },
  { icon: '👩', title: 'Womens Health', desc: 'Complete care for all stages of a womans life from puberty to menopause.', conditions: ['PCOS', 'Menstrual Disorders', 'Infertility', 'Menopause'] },
  { icon: '🧠', title: 'Mental Wellness', desc: 'Holistic treatment for mental and emotional health using classical homeopathy.', conditions: ['Anxiety', 'Depression', 'Insomnia', 'Stress'] },
  { icon: '🛡', title: 'Immunity Boost', desc: 'Strengthen your natural defense system and prevent recurrent infections.', conditions: ['Low Immunity', 'Frequent Cold', 'Allergies', 'Fatigue'] },
  { icon: '🦴', title: 'Joint and Bone', desc: 'Effective treatment for all joint and bone disorders without side effects.', conditions: ['Osteoporosis', 'Gout', 'Back Pain', 'Sciatica'] },
  { icon: '🫁', title: 'Respiratory Health', desc: 'Natural treatment for all respiratory conditions including asthma.', conditions: ['Asthma', 'Bronchitis', 'Sinusitis', 'Allergic Rhinitis'] },
  { icon: '🍽', title: 'Digestive Health', desc: 'Complete digestive care from acidity to irritable bowel syndrome.', conditions: ['IBS', 'Acidity', 'Constipation', 'Piles'] },
  { icon: '👁', title: 'Eye Disorders', desc: 'Homeopathic treatment for various eye conditions and vision problems.', conditions: ['Conjunctivitis', 'Dry Eyes', 'Stye', 'Weak Eyesight'] },
  { icon: '🦷', title: 'Dental and Oral', desc: 'Natural remedies for dental pain, gum disease and oral health problems.', conditions: ['Toothache', 'Gum Disease', 'Mouth Ulcers', 'Bad Breath'] },
  { icon: '💊', title: 'Acute Diseases', desc: 'Quick and effective homeopathic treatment for sudden health conditions.', conditions: ['Fever', 'Cold and Flu', 'Headache', 'Food Poisoning'] },
];

const AllServices = () => {
  const [search, setSearch] = useState('');

  const filtered = allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.conditions.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="services-hero">
        <div className="container">
          <span className="section-tag">What We Treat</span>
          <h1 className="page-title">Our Complete Services</h1>
          <p className="page-desc">
            We provide homeopathic treatment for over 200 conditions.
            Find your condition below and book an appointment today.
          </p>
          <input
            type="text"
            placeholder="Search condition or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      <section className="all-services-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="no-results">
              <p>No services found for your search.</p>
              <button onClick={() => setSearch('')} className="clear-btn">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="services-grid-full">
              {filtered.map((service) => (
                <div key={service.title} className="service-card-full">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <div className="conditions-list">
                    {service.conditions.map((condition) => (
                      <span key={condition} className="condition-tag">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Did Not Find Your Condition?</h2>
          <p className="cta-desc">Contact us directly and our doctor will guide you personally.</p>
          <div className="cta-buttons">
            <Link to="/book-appointment" className="btn-accent">Book Appointment</Link>
            <Link to="/contact" className="btn-white">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllServices;