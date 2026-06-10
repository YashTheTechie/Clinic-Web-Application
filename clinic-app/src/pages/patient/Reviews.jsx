import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const allReviews = [
  { id: 1, name: 'Priya Sharma', rating: 5, comment: 'Dr. treated my chronic migraine that no allopathic doctor could cure. Truly amazing results! I am completely cured after 3 months of treatment.', location: 'Mumbai', date: '2024-01-15', service: 'Chronic Diseases' },
  { id: 2, name: 'Rahul Mehta', rating: 5, comment: 'My son recurring fever stopped completely after homeopathic treatment. Highly recommended for child health issues.', location: 'Pune', date: '2024-02-10', service: 'Child Health' },
  { id: 3, name: 'Sunita Patel', rating: 5, comment: 'I had severe skin allergy for 3 years. After 2 months of treatment my skin is completely clear. No more steroids!', location: 'Thane', date: '2024-02-20', service: 'Skin Disorders' },
  { id: 4, name: 'Amit Verma', rating: 4, comment: 'Very good treatment for my anxiety and sleep problems. Doctor listens patiently and explains everything properly.', location: 'Mumbai', date: '2024-03-05', service: 'Mental Wellness' },
  { id: 5, name: 'Kavya Nair', rating: 5, comment: 'My PCOS got completely under control within 4 months. Regular periods and no more hormonal issues. Thank you doctor!', location: 'Nashik', date: '2024-03-15', service: 'Womens Health' },
  { id: 6, name: 'Deepak Joshi', rating: 4, comment: 'My knee pain from arthritis reduced significantly. I can now walk properly without pain killers. Great treatment!', location: 'Pune', date: '2024-03-25', service: 'Joint and Bone' },
  { id: 7, name: 'Meena Kulkarni', rating: 5, comment: 'Asthma attacks have reduced by 90 percent. I rarely need my inhaler now. Homeopathy truly works wonders!', location: 'Mumbai', date: '2024-04-02', service: 'Respiratory Health' },
  { id: 8, name: 'Suresh Iyer', rating: 5, comment: 'Diabetes under control without increasing medicines. Blood sugar levels are stable now. Very happy with results.', location: 'Thane', date: '2024-04-10', service: 'Chronic Diseases' },
  { id: 9, name: 'Pooja Desai', rating: 4, comment: 'My child eczema is almost gone. The treatment is gentle and completely safe. Doctor is very caring and patient.', location: 'Mumbai', date: '2024-04-18', service: 'Skin Disorders' },
];

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  hero: { background: '#f0faf5', padding: '70px 24px', textAlign: 'center' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  pageTitle: { fontSize: '42px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 16px' },
  pageDesc: { fontSize: '16px', color: '#666', maxWidth: '560px', margin: '0 auto 28px', lineHeight: '1.6' },
  filterRow: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' },
  filterBtn: (active) => ({
    padding: '8px 20px', borderRadius: '99px', fontSize: '14px', fontWeight: '500',
    border: '1.5px solid', cursor: 'pointer', transition: 'all 0.2s',
    borderColor: active ? '#1a6b4a' : '#e0e0e0',
    background: active ? '#1a6b4a' : 'white',
    color: active ? 'white' : '#666',
  }),
  section: { padding: '70px 0', background: 'white', flex: 1 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  card: { background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s' },
  stars: { fontSize: '18px', color: '#f4a535', marginBottom: '12px' },
  comment: { fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '20px' },
  reviewer: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '42px', height: '42px', background: '#d4eddf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a6b4a', fontWeight: '700', fontSize: '16px' },
  reviewerName: { fontSize: '14px', fontWeight: '600', color: '#1a1a1a' },
  reviewerLocation: { fontSize: '12px', color: '#999' },
  serviceBadge: { display: 'inline-block', fontSize: '11px', background: '#f0faf5', color: '#1a6b4a', padding: '3px 10px', borderRadius: '99px', fontWeight: '500', marginBottom: '12px' },
  reviewDate: { fontSize: '12px', color: '#bbb', marginTop: '12px' },
  ctaSection: { background: '#1a6b4a', padding: '80px 0' },
  ctaInner: { textAlign: 'center' },
  ctaTitle: { fontSize: '36px', fontWeight: '700', color: 'white', marginBottom: '16px' },
  ctaDesc: { fontSize: '17px', color: '#a8d5bc', marginBottom: '32px' },
  btnAccent: { padding: '14px 36px', background: '#f4a535', color: 'white', borderRadius: '10px', fontSize: '15px', fontWeight: '700', display: 'inline-block', textDecoration: 'none' },
  sortRow: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' },
  sortLabel: { fontSize: '14px', color: '#666', fontWeight: '500' },
  sortBtn: (active) => ({
    padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
    border: '1.5px solid', cursor: 'pointer', transition: 'all 0.2s',
    borderColor: active ? '#1a6b4a' : '#e0e0e0',
    background: active ? '#f0faf5' : 'white',
    color: active ? '#1a6b4a' : '#666',
  }),
  countText: { fontSize: '14px', color: '#999', marginLeft: 'auto' },
};

const Reviews = () => {
  const [sort, setSort] = useState('recent');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Chronic Diseases', 'Skin Disorders', 'Child Health', 'Womens Health', 'Mental Wellness', 'Joint and Bone', 'Respiratory Health'];

  const sorted = [...allReviews]
    .filter((r) => filter === 'All' || r.service === filter)
    .sort((a, b) => {
      if (sort === 'recent') return new Date(b.date) - new Date(a.date);
      if (sort === 'highest') return b.rating - a.rating;
      if (sort === 'lowest') return a.rating - b.rating;
      return 0;
    });

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <section style={styles.hero}>
        <span style={styles.tag}>Patient Stories</span>
        <h1 style={styles.pageTitle}>Patient Reviews</h1>
        <p style={styles.pageDesc}>
          Read what our patients say about their healing journey with HomeoEase Clinic.
        </p>
        <div style={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={styles.filterBtn(filter === cat)}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section style={{ ...styles.section }}>
        <div style={styles.container}>
          <div style={styles.sortRow}>
            <span style={styles.sortLabel}>Sort by:</span>
            <button style={styles.sortBtn(sort === 'recent')} onClick={() => setSort('recent')}>Most Recent</button>
            <button style={styles.sortBtn(sort === 'highest')} onClick={() => setSort('highest')}>Highest Rated</button>
            <button style={styles.sortBtn(sort === 'lowest')} onClick={() => setSort('lowest')}>Lowest Rated</button>
            <span style={styles.countText}>{sorted.length} reviews</span>
          </div>

          <div style={styles.grid}>
            {sorted.map((review) => (
              <div key={review.id} style={styles.card}>
                <span style={styles.serviceBadge}>{review.service}</span>
                <div style={styles.stars}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p style={styles.comment}>{review.comment}</p>
                <div style={styles.reviewer}>
                  <div style={styles.avatar}>{review.name[0]}</div>
                  <div>
                    <div style={styles.reviewerName}>{review.name}</div>
                    <div style={styles.reviewerLocation}>{review.location}</div>
                  </div>
                </div>
                <div style={styles.reviewDate}>{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <div style={{ ...styles.container, ...styles.ctaInner }}>
          <h2 style={styles.ctaTitle}>Share Your Experience</h2>
          <p style={styles.ctaDesc}>Had a good experience? Login to write your review.</p>
          <Link to="/login" style={styles.btnAccent}>Write a Review</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;