import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  wrapper: { fontFamily: 'Plus Jakarta Sans, sans-serif' },
  welcome: { marginBottom: '28px' },
  welcomeTitle: { fontSize: '24px', fontWeight: '800', color: '#1a1a1a', marginBottom: '4px' },
  welcomeDesc: { fontSize: '15px', color: '#666' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' },
  statsGrid2: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' },
  statCard: (color) => ({ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', borderLeft: `4px solid ${color}`, display: 'flex', flexDirection: 'column', gap: '8px' }),
  statTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  statLabel: { fontSize: '13px', color: '#999', fontWeight: '500' },
  statIcon: (color) => ({ width: '44px', height: '44px', background: color + '20', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }),
  statNum: { fontSize: '36px', fontWeight: '800', color: '#1a1a1a' },
  statFooter: { fontSize: '12px', color: '#999' },
  section: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '24px' },
  sectionTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a' },
  viewAll: { fontSize: '13px', color: '#1a6b4a', fontWeight: '600', textDecoration: 'none' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '10px 16px', borderBottom: '1px solid #f0f0f0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f9f9f9' },
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
  avatar: { width: '34px', height: '34px', background: '#d4eddf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a6b4a', fontWeight: '700', fontSize: '14px' },
  nameCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  actionCard: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', textAlign: 'center', textDecoration: 'none', display: 'block' },
  actionIcon: { fontSize: '32px', marginBottom: '12px' },
  actionTitle: { fontSize: '15px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  actionDesc: { fontSize: '13px', color: '#999' },
  emptyState: { textAlign: 'center', padding: '40px 0', color: '#999' },
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    attendedToday: 0,
    totalCancelled: 0,
    pendingTotal: 0,
  });
  const [todayAppts, setTodayAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) { setLoading(false); return; }

        const headers = {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        };

        const [statsRes, allRes] = await Promise.all([
          fetch('http://localhost:5000/api/admin/stats', { headers }),
          fetch('http://localhost:5000/api/appointments/all', { headers }),
        ]);

        const statsData = await statsRes.json();
        const allData = await allRes.json();
        const allAppts = Array.isArray(allData) ? allData : [];

        const todayStr = new Date().toLocaleDateString('en-CA');
        const todayList = allAppts.filter((a) => {
          const d = a.date?.includes('T') ? a.date.split('T')[0] : a.date;
          return d === todayStr;
        });

        setTodayAppts(todayList);
        setStats({
          totalPatients: statsData.totalPatients || 0,
          totalAppointments: allAppts.length,
          todayAppointments: todayList.length,
          attendedToday: todayList.filter((a) => a.status === 'Attended').length,
          totalCancelled: statsData.totalCancelled || 0,
          pendingTotal: allAppts.filter((a) => a.status === 'Pending').length,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const row1 = [
    { label: 'Total Patients', num: stats.totalPatients, icon: '👥', color: '#1a6b4a', footer: 'Registered patients' },
    { label: 'Total Appointments', num: stats.totalAppointments, icon: '📅', color: '#3b82f6', footer: 'All time' },
    { label: 'Pending', num: stats.pendingTotal, icon: '⏳', color: '#f4a535', footer: 'Awaiting attendance' },
  ];

  const row2 = [
    { label: 'Today Appointments', num: stats.todayAppointments, icon: '🕐', color: '#8b5cf6', footer: new Date().toLocaleDateString('en-IN') },
    { label: 'Attended Today', num: stats.attendedToday, icon: '✅', color: '#10b981', footer: 'Completed today' },
    { label: 'Total Cancelled', num: stats.totalCancelled, icon: '❌', color: '#ef4444', footer: 'All time' },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.welcome}>
        <h1 style={styles.welcomeTitle}>Welcome Back, Dr. Priyanka!</h1>
        <p style={styles.welcomeDesc}>Here is your clinic overview for today.</p>
      </div>

      <div style={styles.statsGrid}>
        {row1.map((s) => (
          <div key={s.label} style={styles.statCard(s.color)}>
            <div style={styles.statTop}>
              <span style={styles.statLabel}>{s.label}</span>
              <div style={styles.statIcon(s.color)}>{s.icon}</div>
            </div>
            <div style={styles.statNum}>{loading ? '...' : s.num}</div>
            <div style={styles.statFooter}>{s.footer}</div>
          </div>
        ))}
      </div>

      <div style={styles.statsGrid2}>
        {row2.map((s) => (
          <div key={s.label} style={styles.statCard(s.color)}>
            <div style={styles.statTop}>
              <span style={styles.statLabel}>{s.label}</span>
              <div style={styles.statIcon(s.color)}>{s.icon}</div>
            </div>
            <div style={styles.statNum}>{loading ? '...' : s.num}</div>
            <div style={styles.statFooter}>{s.footer}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTop}>
          <span style={styles.sectionTitle}>Today's Appointments</span>
          <Link to="/admin/appointments" style={styles.viewAll}>View All</Link>
        </div>
        {loading ? (
          <div style={styles.emptyState}>Loading...</div>
        ) : todayAppts.length === 0 ? (
          <div style={styles.emptyState}>No appointments today</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Time Slot</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todayAppts.map((appt) => {
                const apptId = appt._id || appt.id;
                return (
                  <tr key={apptId}>
                    <td style={styles.td}>
                      <div style={styles.nameCell}>
                        <div style={styles.avatar}>
                          {appt.name ? appt.name[0].toUpperCase() : '?'}
                        </div>
                        {appt.name || 'Unknown'}
                      </div>
                    </td>
                    <td style={styles.td}>{appt.service || 'General'}</td>
                    <td style={styles.td}>{appt.slot}</td>
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

      <div style={styles.section}>
        <div style={styles.sectionTop}>
          <span style={styles.sectionTitle}>Quick Actions</span>
        </div>
        <div style={styles.actionsGrid}>
          {[
            { icon: '📅', title: 'All Appointments', desc: 'View and manage all appointments', path: '/admin/appointments' },
            { icon: '📋', title: 'View History', desc: 'See all attended appointments', path: '/admin/history' },
            { icon: '🌐', title: 'Patient Website', desc: 'Go to the patient facing website', path: '/' },
          ].map((action) => (
            <Link key={action.title} to={action.path} style={styles.actionCard}>
              <div style={styles.actionIcon}>{action.icon}</div>
              <div style={styles.actionTitle}>{action.title}</div>
              <div style={styles.actionDesc}>{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;