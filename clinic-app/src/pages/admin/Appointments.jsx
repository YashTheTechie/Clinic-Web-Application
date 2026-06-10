import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  wrapper: { fontFamily: 'Plus Jakarta Sans, sans-serif' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  pageTitle: { fontSize: '22px', fontWeight: '800', color: '#1a1a1a' },
  searchInput: { padding: '10px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', width: '260px' },
  tabRow: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tab: (active) => ({ padding: '8px 20px', borderRadius: '99px', fontSize: '14px', fontWeight: '600', border: '1.5px solid', cursor: 'pointer', transition: 'all 0.2s', borderColor: active ? '#1a6b4a' : '#e0e0e0', background: active ? '#1a6b4a' : 'white', color: active ? 'white' : '#666', fontFamily: 'inherit' }),
  section: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', borderBottom: '1px solid #f0f0f0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f9f9f9' },
  nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: { width: '34px', height: '34px', background: '#d4eddf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a6b4a', fontWeight: '700', fontSize: '14px', flexShrink: 0 },
  badge: (status) => {
    const s = status?.toLowerCase();
    const map = {
      attended: { color: '#065f46', bg: '#d1fae5' },
      cancelled: { color: '#991b1b', bg: '#fee2e2' },
      pending: { color: '#92400e', bg: '#fef3c7' },
    };
    const c = map[s] || map.pending;
    return { display: 'inline-block', padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: '600', color: c.color, background: c.bg };
  },
  viewBtn: { padding: '6px 14px', background: '#f0faf5', color: '#1a6b4a', border: '1px solid #d4eddf', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  emptyState: { textAlign: 'center', padding: '60px 0', color: '#999' },
  emptyIcon: { fontSize: '48px', marginBottom: '12px' },
  emptyText: { fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '4px' },
  countBadge: { background: '#f0faf5', color: '#1a6b4a', fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '99px', marginLeft: '6px' },
};

const Appointments = () => {
  const [tab, setTab] = useState('All');
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Today', 'Pending', 'Attended', 'Cancelled'];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/appointments/all', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const todayStr = new Date().toLocaleDateString('en-CA');

  const filtered = appointments
    .filter((a) => {
      const apptDate = a.date?.includes('T') ? a.date.split('T')[0] : a.date;
      const status = a.status?.toLowerCase() || 'pending';
      if (tab === 'Today') return apptDate === todayStr;
      if (tab === 'Pending') return status === 'pending';
      if (tab === 'Attended') return status === 'attended';
      if (tab === 'Cancelled') return status === 'cancelled';
      return true;
    })
    .filter((a) =>
      (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.service || '').toLowerCase().includes(search.toLowerCase())
    );

  const formatDate = (rawDate) => {
    if (!rawDate) return 'N/A';
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime())
      ? rawDate
      : parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topRow}>
        <h1 style={styles.pageTitle}>
          Appointments
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

      <div style={styles.tabRow}>
        {tabs.map((t) => (
          <button key={t} style={styles.tab(tab === t)} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div style={styles.section}>
        {loading ? (
          <div style={styles.emptyState}>Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <div style={styles.emptyText}>No appointments found</div>
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
              {filtered.map((appt) => {
                const apptId = appt._id || appt.id;
                return (
                  <tr key={apptId}>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={styles.avatar}>
                          {appt.name ? appt.name[0].toUpperCase() : '?'}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>{appt.name || 'Unknown'}</div>
                          <div style={{ fontSize: '12px', color: '#999' }}>{appt.phone || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{appt.service || 'N/A'}</td>
                    <td style={styles.td}>{formatDate(appt.date)}</td>
                    <td style={styles.td}>{appt.slot || 'N/A'}</td>
                    <td style={styles.td}>
                      <span style={styles.badge(appt.status)}>
                        {appt.status || 'Pending'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <Link to={`/admin/appointments/${apptId}`} style={styles.viewBtn}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Appointments;