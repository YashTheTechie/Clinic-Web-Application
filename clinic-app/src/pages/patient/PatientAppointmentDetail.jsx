import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../utils/axiosInstance';

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Plus Jakarta Sans, sans-serif' },
  container: { maxWidth: '900px', margin: '0 auto', padding: '0 24px' },
  section: { padding: '60px 0', flex: 1, background: '#f9fafb' },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#1a6b4a', fontWeight: '600', fontFamily: 'inherit', padding: 0, marginBottom: '28px', display: 'block' },
  card: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '20px' },
  cardTitle: { fontSize: '17px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' },
  badge: (status) => {
    const s = status?.toLowerCase();
    const map = {
      attended: { color: '#065f46', bg: '#d1fae5' },
      cancelled: { color: '#991b1b', bg: '#fee2e2' },
      pending: { color: '#92400e', bg: '#fef3c7' },
    };
    const c = map[s] || map.pending;
    return { display: 'inline-block', padding: '5px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', color: c.color, background: c.bg };
  },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  infoItem: { background: '#f9fafb', borderRadius: '10px', padding: '12px 14px' },
  infoLabel: { fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' },
  infoValue: { fontSize: '14px', color: '#1a1a1a', fontWeight: '600' },
  issueBox: { background: '#f9fafb', borderRadius: '12px', padding: '16px', lineHeight: '1.7', fontSize: '14px', color: '#444' },
  prescBox: { background: '#f0faf5', borderRadius: '12px', padding: '20px', lineHeight: '1.8', fontSize: '14px', color: '#1a3a2a', border: '1px solid #d4eddf' },
  noPrescBox: { background: '#f9fafb', borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#999', fontSize: '14px' },

  // Action buttons
  actionRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' },
  rescheduleBtn: { padding: '10px 22px', background: '#fff8e6', color: '#b07800', border: '1px solid #f4d58d', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  cancelBtn: { padding: '10px 22px', background: '#fff0f0', color: '#cc0000', border: '1px solid #ffcccc', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },

  // Timeline
  timeline: { display: 'flex', flexDirection: 'column' },
  timelineItem: (done, isRed) => ({ display: 'flex', gap: '16px', alignItems: 'flex-start', opacity: done ? 1 : 0.4 }),
  timelineDot: (done, isRed) => ({ width: '36px', height: '36px', borderRadius: '50%', background: isRed ? '#fee2e2' : done ? '#1a6b4a' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, marginTop: '4px' }),
  timelineConnector: (done, isRed) => ({ width: '2px', height: '32px', background: isRed ? '#fca5a5' : done ? '#1a6b4a' : '#e0e0e0', margin: '4px 0 4px 17px' }),
  timelineTitle: (isRed) => ({ fontSize: '15px', fontWeight: '700', color: isRed ? '#991b1b' : '#1a1a1a', marginBottom: '2px' }),
  timelineDesc: { fontSize: '13px', color: '#999' },
  timelineReason: { fontSize: '13px', color: '#cc0000', background: '#fff0f0', padding: '6px 10px', borderRadius: '6px', marginTop: '4px', display: 'inline-block' },

  // Overlay
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '20px', padding: '36px', maxWidth: '460px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalTitle: { fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' },
  modalDesc: { fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: '1.6' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  modalInput: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' },
  modalSelect: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', background: 'white', marginBottom: '16px' },
  modalTextarea: { width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '100px', marginBottom: '16px' },
  modalBtns: { display: 'flex', gap: '10px', justifyContent: 'flex-end' },
  modalCancelBtn: { padding: '10px 20px', background: '#f4f4f4', color: '#666', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  modalConfirm: (color) => ({ padding: '10px 20px', background: color, color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }),
  slotFullMsg: { fontSize: '13px', color: '#cc0000', marginBottom: '12px', padding: '10px', background: '#fff0f0', borderRadius: '8px' },
  loadingBox: { textAlign: 'center', padding: '80px 0', color: '#999', fontSize: '16px' },
};

const slots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

const PatientAppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appt, setAppt] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cancel
  const [showCancel, setShowCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // Reschedule
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [slotFullMsg, setSlotFullMsg] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchAppointment = async () => {
    try {
      const res = await axiosInstance.get(`/appointments/patient/${id}`);
      setAppt(res.data);
    } catch (err) {
      console.log('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointment(); }, [id]);

  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const todayStr = getTodayDate();
  const isUpcoming = appt && appt.date?.split('T')[0] >= todayStr && appt.status?.toLowerCase() === 'pending';

  const handleCancel = async () => {
    if (!cancelReason.trim()) { alert('Please provide a reason for cancellation.'); return; }
    setCancelling(true);
    try {
      await axiosInstance.patch(`/appointments/${id}/cancel`, { reason: cancelReason });
      setShowCancel(false);
      fetchAppointment();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancellation failed.');
    } finally {
      setCancelling(false);
    }
  };

  const handleReschedule = async () => {
    if (!newDate || !newSlot) { alert('Please select date and slot.'); return; }
    setSlotFullMsg('');
    setUpdating(true);
    try {
      await axiosInstance.patch(`/appointments/${id}/reschedule`, { date: newDate, slot: newSlot });
      setShowReschedule(false);
      fetchAppointment();
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed.';
      if (msg.toLowerCase().includes('slot') || msg.toLowerCase().includes('booked')) {
        setSlotFullMsg(msg);
      } else {
        alert(msg);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.loadingBox}>Loading appointment details...</div>
      <Footer />
    </div>
  );

  if (!appt) return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.loadingBox}>Appointment not found.</div>
      <Footer />
    </div>
  );

  const isAttended = appt.status?.toLowerCase() === 'attended';
  const isCancelled = appt.status?.toLowerCase() === 'cancelled';

  const timeline = isCancelled ? [
    {
      icon: '📋',
      title: 'Appointment Booked',
      desc: new Date(appt.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      done: true,
      isRed: false,
    },
    {
      icon: '❌',
      title: 'Appointment Cancelled',
      desc: new Date(appt.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      reason: appt.cancelReason || 'Cancelled by patient',
      done: true,
      isRed: true,
    },
  ] : [
    {
      icon: '📋',
      title: 'Appointment Booked',
      desc: new Date(appt.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      done: true,
      isRed: false,
    },
    {
      icon: '✅',
      title: 'Appointment Confirmed',
      desc: `Scheduled for ${new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} at ${appt.slot}`,
      done: true,
      isRed: false,
    },
    {
      icon: '👩',
      title: 'Patient Attended',
      desc: isAttended
        ? new Date(appt.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Pending',
      done: isAttended,
      isRed: false,
    },
    {
      icon: '💊',
      title: 'Prescription Provided',
      desc: isAttended && appt.prescription ? 'Prescription has been added by doctor' : 'Pending',
      done: isAttended && !!appt.prescription,
      isRed: false,
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Cancel Modal */}
      {showCancel && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Cancel Appointment</div>
            <div style={styles.modalDesc}>
              Please tell us why you are cancelling. This helps us improve our services.
            </div>
            <label style={styles.label}>Reason for Cancellation</label>
            <textarea
              style={styles.modalTextarea}
              placeholder="e.g. Schedule conflict, feeling better, want to reschedule..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div style={styles.modalBtns}>
              <button style={styles.modalCancelBtn} onClick={() => setShowCancel(false)}>
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

      {/* Reschedule Modal */}
      {showReschedule && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>Reschedule Appointment</div>
            <div style={styles.modalDesc}>
              Select a new date and time. Max 5 appointments allowed per slot.
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
              <button style={styles.modalCancelBtn} onClick={() => setShowReschedule(false)}>
                Cancel
              </button>
              <button
                style={styles.modalConfirm('#1a6b4a')}
                onClick={handleReschedule}
                disabled={updating}
              >
                {updating ? 'Updating...' : 'Confirm Reschedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      <section style={styles.section}>
        <div style={styles.container}>
          <button style={styles.backBtn} onClick={() => navigate('/my-appointments')}>
            Back to My Appointments
          </button>

          {/* Status Card */}
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', marginBottom: '4px' }}>
                  {appt.service}
                </div>
                <div style={{ fontSize: '14px', color: '#999' }}>
                  Appointment ID: {appt._id.slice(-8).toUpperCase()}
                </div>
              </div>
              <span style={styles.badge(appt.status)}>{appt.status}</span>
            </div>

            {/* Action buttons only for upcoming */}
            {isUpcoming && (
              <div style={styles.actionRow}>
                <button
                  style={styles.rescheduleBtn}
                  onClick={() => {
                    setNewDate(appt.date?.split('T')[0] || '');
                    setNewSlot(appt.slot);
                    setSlotFullMsg('');
                    setShowReschedule(true);
                  }}
                >
                  Reschedule Appointment
                </button>
                <button
                  style={styles.cancelBtn}
                  onClick={() => { setCancelReason(''); setShowCancel(true); }}
                >
                  Cancel Appointment
                </button>
              </div>
            )}
          </div>

          {/* Appointment Info */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Appointment Details</div>
            <div style={styles.infoGrid}>
              {[
                { label: 'Patient Name', value: appt.name },
                { label: 'Phone', value: appt.phone },
                { label: 'Email', value: appt.email },
                { label: 'Age', value: `${appt.age} years` },
                { label: 'Gender', value: appt.gender },
                { label: 'Service', value: appt.service },
                { label: 'Date', value: new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Time Slot', value: appt.slot },
                { label: 'Duration of Issue', value: appt.duration },
              ].map((item) => (
                <div key={item.label} style={styles.infoItem}>
                  <div style={styles.infoLabel}>{item.label}</div>
                  <div style={styles.infoValue}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Health Issue Description</div>
            <div style={styles.issueBox}>{appt.issue}</div>
          </div>

          {/* Timeline */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Appointment Timeline</div>
            <div style={styles.timeline}>
              {timeline.map((item, i) => (
                <div key={i}>
                  <div style={styles.timelineItem(item.done, item.isRed)}>
                    <div style={styles.timelineDot(item.done, item.isRed)}>
                      {item.icon}
                    </div>
                    <div style={{ paddingTop: '6px' }}>
                      <div style={styles.timelineTitle(item.isRed)}>{item.title}</div>
                      <div style={styles.timelineDesc}>{item.desc}</div>
                      {item.reason && (
                        <div style={styles.timelineReason}>
                          Reason: {item.reason}
                        </div>
                      )}
                    </div>
                  </div>
                  {i < timeline.length - 1 && (
                    <div style={styles.timelineConnector(item.done, timeline[i + 1]?.isRed)} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prescription */}
          {!isCancelled && (
            <div style={styles.card}>
              <div style={styles.cardTitle}>Prescription from Dr. Priyanka Singh</div>
              {appt.prescription ? (
                <div style={styles.prescBox}>
                  <div style={{ fontSize: '12px', color: '#1a6b4a', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Prescription
                  </div>
                  {appt.prescription}
                </div>
              ) : (
                <div style={styles.noPrescBox}>
                  {isAttended
                    ? 'No prescription has been added yet.'
                    : 'Prescription will be available after your appointment is attended by the doctor.'}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PatientAppointmentDetail;