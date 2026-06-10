import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const styles = {
  wrapper: { display: 'flex', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif' },

  // Sidebar
  sidebar: { width: '260px', background: '#1a6b4a', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100, transition: 'transform 0.3s' },
  sidebarTop: { padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  sidebarLogo: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoCircle: { width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '18px' },
  logoName: { fontSize: '16px', fontWeight: '700', color: 'white' },
  logoSub: { fontSize: '11px', color: '#a8d5bc' },
  doctorBadge: { marginTop: '16px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px' },
  doctorName: { fontSize: '13px', fontWeight: '700', color: 'white' },
  doctorRole: { fontSize: '11px', color: '#a8d5bc', marginTop: '2px' },

  // Nav
  sidebarNav: { flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' },
  navLabel: { fontSize: '11px', fontWeight: '600', color: '#6aad8a', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 12px', marginTop: '8px' },
  navLink: (active) => ({
    display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '500', textDecoration: 'none',
    transition: 'all 0.2s', cursor: 'pointer', border: 'none', width: '100%', textAlign: 'left',
    background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    color: active ? 'white' : '#a8d5bc',
  }),
  navIcon: { fontSize: '18px', width: '22px', textAlign: 'center' },

  // Sidebar Bottom
  sidebarBottom: { padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', color: '#ffaaaa', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', fontFamily: 'inherit', transition: 'background 0.2s' },

  // Main
  main: { marginLeft: '260px', flex: 1, background: '#f4f6f9', minHeight: '100vh' },
  topbar: { background: 'white', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 },
  topbarTitle: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a' },
  topbarRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  topbarDate: { fontSize: '13px', color: '#999' },
  topbarAvatar: { width: '38px', height: '38px', background: '#1a6b4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '16px' },
  content: { padding: '28px' },

  // Mobile
  hamburger: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#333' },
};

const navItems = [
  { icon: '📊', label: 'Dashboard', path: '/admin' },
  { icon: '📅', label: 'All Appointments', path: '/admin/appointments' },
  { icon: '📋', label: 'History', path: '/admin/history' },
];

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/appointments': 'Appointments',
  '/admin/history': 'Appointment History',
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const currentTitle = pageTitles[location.pathname] || 'Admin Panel';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={styles.wrapper}>

      {/* Sidebar */}
      <div style={{ ...styles.sidebar, transform: mobileOpen ? 'translateX(0)' : undefined }}>
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarLogo}>
            <div style={styles.logoCircle}>H</div>
            <div>
              <div style={styles.logoName}>HomeoEase</div>
              <div style={styles.logoSub}>Admin Panel</div>
            </div>
          </div>
          <div style={styles.doctorBadge}>
            <div style={styles.doctorName}>Dr. Priyanka Singh</div>
            <div style={styles.doctorRole}>BHMS, MD - Homeopathy</div>
          </div>
        </div>

        <nav style={styles.sidebarNav}>
          <span style={styles.navLabel}>Main Menu</span>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={styles.navLink(location.pathname === item.path)}
              onClick={() => setMobileOpen(false)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={styles.sidebarBottom}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <span style={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarTitle}>{currentTitle}</div>
          <div style={styles.topbarRight}>
            <span style={styles.topbarDate}>{today}</span>
            <div style={styles.topbarAvatar}>P</div>
          </div>
        </div>
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;