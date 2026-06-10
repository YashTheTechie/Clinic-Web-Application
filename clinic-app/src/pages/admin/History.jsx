import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  wrapper: { fontFamily: 'Plus Jakarta Sans, sans-serif' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  pageTitle: { fontSize: '22px', fontWeight: '800', color: '#1a1a1a' },
  searchInput: { padding: '10px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', width: '260px' },
  section: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', borderBottom: '1px solid #f0f0f0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f9f9f9' },
  nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '34px', height: '34px', background: '#d4eddf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a6b4a', fontWeight: '700', fontSize: '14px', flexShrink: 0 },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '600', color: '#065f46', background: '#d1fae5' },
  viewBtn: { padding: '6px 14px', background: '#f0faf5', color: '#1a6b4a', border: '1px solid #d4eddf', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' },
  emptyState: { textAlign: 'center', padding: '60px 0', color: '#999' },
  emptyIcon: { fontSize: '48px', marginBottom: '12px' },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' },
  summaryCard: (color) => ({ background: 'white', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', borderLeft: `4px solid ${color}` }),
  summaryNum: { fontSize: '30px', fontWeight: '800', color: '#1a1a1a' },
  summaryLabel: { fontSize: '13px', color: '#999', marginTop: '4px' },
  countBadge: { background: '#d1fae5', color: '#065f46', fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '99px', marginLeft: '6px' },
};

const History = () => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/appointments/history', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log('History fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = history.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.topRow}>
        <h1 style={styles.pageTitle}>
          Appointment History
          <span style={styles.countBadge}>{filtered.length}</span>
        </h1>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search patient or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.summaryRow}>
        {[
          { label: 'Total Attended', num: history.length, color: '#10b981' },
          { label: 'This Week', num: history.filter(a => new Date(a.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, color: '#3b82f6' },
          { label: 'This Month', num: history.filter(a => new Date(a.updatedAt).getMonth() === new Date().getMonth()).length, color: '#1a6b4a' },
        ].map((s) => (
          <div key={s.label} style={styles.summaryCard(s.color)}>
            <div style={styles.summaryNum}>{s.num}</div>
            <div style={styles.summaryLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        {loading ? (
          <div style={styles.emptyState}>Loading history...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <div>No history found</div>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Slot</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt) => (
                <tr key={appt._id}>
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <div style={styles.avatar}>{appt.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: '600' }}>{appt.name}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{appt.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>{appt.service}</td>
                  <td style={styles.td}>
                    {new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={styles.td}>{appt.slot}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>Attended</span>
                  </td>
                  <td style={styles.td}>
                    <Link to={`/admin/appointments/${appt._id}`} style={styles.viewBtn}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;