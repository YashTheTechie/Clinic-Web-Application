import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' },
  hero: { background: '#f0faf5', padding: '60px 24px', textAlign: 'center' },
  tag: { fontSize: '13px', fontWeight: '600', color: '#1a6b4a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  heroTitle: { fontSize: '38px', fontWeight: '800', color: '#1a1a1a', margin: '8px 0 12px' },
  heroDesc: { fontSize: '16px', color: '#666', maxWidth: '500px', margin: '0 auto' },
  section: { padding: '60px 0', background: 'white', flex: 1 },
  tabRow: { display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' },
  tab: (active) => ({ padding: '8px 20px', borderRadius: '99px', fontSize: '14px', fontWeight: '600', border: '1.5px solid', cursor: 'pointer', borderColor: active ? '#1a6b4a' : '#e0e0e0', background: active ? '#1a6b4a' : 'white', color: active ? 'white' : '#666', fontFamily: 'inherit' }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' },
  card: { background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  serviceName: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a' },
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
  infoRow: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#666' },
  infoIcon: { fontSize: '16px' },
  divider: { height: '1px', background: '#f0f0f0', margin: '16px 0' },
  btnRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  viewBtn: { display: 'inline-block', padding: '8px 16px', background: '#f0faf5', color: '#1a6b4a', border: '1px solid #d4eddf', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' },
  updateBtn: { padding: '8px 16px', background: '#fff8e6', color: '#b07800', border: '1px solid #f4d58d', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  cancelBtn: { padding: '8px 16px', background: '#fff0f0', color: '#cc0000', border: '1px solid #ffcccc', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  bookBtn: { display: 'inline-block', padding: '10px 24px', background: '#1a6b4a', color: 'white', borderRadius: '10px', fontSize: '14px', fontWeight: '600', textDecoration: 'none' },
  emptyState: { textAlign: 'center', padding: '60px 0' },
  emptyIcon: { fontSize: '56px', marginBottom: '16px' },
  emptyTitle: { fontSize: '20px', fontWeight: '700', color: '#666', marginBottom: '8px' },
  emptyDesc: { fontSize: '15px', color: '#999', marginBottom: '24px' },
  loadingState: { textAlign: 'center', padding: '60px 0', color: '#999', fontSize: '16px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },

  // Overlay
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '20px', padding: '36px', maxWidth: '460px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalTitle: { fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' },
  modalDesc: { fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: '1.6' },
  modalInput: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' },
  modalSelect: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: 'white', marginBottom: '16px' },
  modalTextarea: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '100px', marginBottom: '16px' },
  modalBtns: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  modalCancel: { padding: '10px 20px', background: '#f4f4f4', color: '#666', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  modalConfirm: (color) => ({ padding: '10px 20px', background: color, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }),
  slotFullMsg: { fontSize: '13px', color: '#cc0000', marginBottom: '12px', padding: '10px', background: '#fff0f0', borderRadius: '8px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
};

const slots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');

  // Cancel modal
  const [showCancel, setShowCancel] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // Update modal
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateAppt, setUpdateAppt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [slotFullMsg, setSlotFullMsg] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get('/appointments/my');
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const filtered = appointments.filter((a) => {
    const apptDate = a.date?.split('T')[0] || '';
    const status = a.status?.toLowerCase();
    if (tab === 'Upcoming') return apptDate >= todayStr && status === 'pending';
    if (tab === 'Attended') return status === 'attended';
    if (tab === 'Cancelled') return status === 'cancelled';
    return true;
  });

  // Cancel
  const openCancel = (id) => { setCancelId(id); setCancelReason(''); setShowCancel(true); };

  const handleCancel = async () => {
    if (!cancelReason.trim()) { alert('Please provide a reason for cancellation.'); return; }
    setCancelling(true);
    try {
      await axiosInstance.patch(`/appointments/${cancelId}/cancel`, { reason: cancelReason });
      setShowCancel(false);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation failed.');
    } finally {
      setCancelling(false);
    }
  };

  // Update
  const openUpdate = (appt) => {
    setUpdateAppt(appt);
    setNewDate(appt.date?.split('T')[0] || '');
    setNewSlot(appt.slot);
    setSlotFullMsg('');
    setShowUpdate(true);
  };

  const handleUpdate = async () => {
    if (!newDate || !newSlot) { alert('Please select date and slot.'); return; }
    setSlotFullMsg('');
    setUpdating(true);
    try {
      await axiosInstance.patch(`/appointments/${updateAppt._id}/reschedule`, {
        date: newDate,
        slot: newSlot,
      });
      setShowUpdate(false);
      fetchAppointments();
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed.';
      if (msg.includes('fully booked') || msg.includes('slot')) {
        setSlotFullMsg(msg);
      } else {
        alert(msg);
      }
    } finally {
      setUpdating(false);
    }
  };

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Cancel Modal */}
      {showCancel && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Cancel Appointment</div>
            <div style={styles.modalDesc}>
              Please tell us why you are cancelling this appointment.
              This will help us improve our services.
            </div>
            <label style={styles.label}>Reason for Cancellation</label>
            <textarea
              style={styles.modalTextarea}
              placeholder="e.g. Schedule conflict, feeling better, want to reschedule..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div style={styles.modalBtns}>
              <button style={styles.modalCancel} onClick={() => setShowCancel(false)}>
                Keep Appointment
              </button>
              <button
                style={styles.modalConfirm('#cc0000')}
                onClick={handleCancel}
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Reschedule Appointment</div>
            <div style={styles.modalDesc}>
              Select a new date and time slot for your appointment.
              Maximum 5 appointments are allowed per slot.
            </div>
            {slotFullMsg && (
              <div style={styles.slotFullMsg}>{slotFullMsg}</div>
            )}
            <label style={styles.label}>New Date</label>
            <input
              style={styles.modalInput}
              type="date"
              min={getTodayDate()}
              value={newDate}
              onChange={(e) => { setNewDate(e.target.value); setSlotFullMsg(''); }}
            />
            <label style={styles.label}>New Time Slot</label>
            <select
              style={styles.modalSelect}
              value={newSlot}
              onChange={(e) => { setNewSlot(e.target.value); setSlotFullMsg(''); }}
            >
              <option value="">Select a slot</option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div style={styles.modalBtns}>
              <button style={styles.modalCancel} onClick={() => setShowUpdate(false)}>
                Cancel
              </button>
              <button
                style={styles.modalConfirm('#1a6b4a')}
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Confirm Reschedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      <section style={styles.hero}>
        <span style={styles.tag}>My Health Journey</span>
        <h1 style={styles.heroTitle}>My Appointments</h1>
        <p style={styles.heroDesc}>
          Track all your appointments and prescriptions from Dr. Priyanka Singh.
        </p>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.topRow}>
            <div style={styles.tabRow}>
              {['All', 'Upcoming', 'Attended', 'Cancelled'].map((t) => (
                <button key={t} style={styles.tab(tab === t)} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>
            <Link to="/book-appointment" style={styles.bookBtn}>
              + Book New Appointment
            </Link>
          </div>

          {loading ? (
            <div style={styles.loadingState}>Loading your appointments...</div>
          ) : filtered.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📅</div>
              <div style={styles.emptyTitle}>No appointments found</div>
              <div style={styles.emptyDesc}>
                {tab === 'All' ? 'You have not booked any appointments yet.' : `No ${tab.toLowerCase()} appointments found.`}
              </div>
              <Link to="/book-appointment" style={styles.bookBtn}>
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            <div style={styles.grid}>
              {filtered.map((appt) => {
                const apptDate = appt.date?.split('T')[0] || '';
                const isUpcoming = apptDate >= todayStr && appt.status?.toLowerCase() === 'pending';
                return (
                  <div key={appt._id} style={styles.card}>
                    <div style={styles.cardTop}>
                      <div style={styles.serviceName}>{appt.service}</div>
                      <span style={styles.badge(appt.status)}>{appt.status || 'Pending'}</span>
                    </div>

                    <div style={styles.infoRow}>
                      <span style={styles.infoIcon}>📅</span>
                      <span>{appt.date ? new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoIcon}>🕐</span>
                      <span>{appt.slot}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoIcon}>👤</span>
                      <span>{appt.name}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoIcon}>📞</span>
                      <span>{appt.phone}</span>
                    </div>

                    <div style={styles.divider} />

                    <div style={styles.btnRow}>
                      <Link to={`/my-appointments/${appt._id}`} style={styles.viewBtn}>
                        View Details
                      </Link>
                      {isUpcoming && (
                        <>
                          <button style={styles.updateBtn} onClick={() => openUpdate(appt)}>
                            Reschedule
                          </button>
                          <button style={styles.cancelBtn} onClick={() => openCancel(appt._id)}>
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyAppointments;