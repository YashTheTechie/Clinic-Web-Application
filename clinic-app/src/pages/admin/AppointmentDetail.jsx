import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const styles = {
  wrapper: { fontFamily: 'Plus Jakarta Sans, sans-serif' },
  backBtn: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#1a6b4a', fontWeight: '600', textDecoration: 'none', marginBottom: '24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px', alignItems: 'flex-start' },
  card: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' },
  patientHeader: { display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' },
  avatar: { width: '60px', height: '60px', background: '#d4eddf', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a6b4a', fontWeight: '800', fontSize: '24px', flexShrink: 0 },
  patientName: { fontSize: '20px', fontWeight: '800', color: '#1a1a1a' },
  patientSub: { fontSize: '13px', color: '#999', marginTop: '2px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  infoItem: { background: '#f9fafb', borderRadius: '10px', padding: '12px 14px' },
  infoLabel: { fontSize: '11px', color: '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' },
  infoValue: { fontSize: '14px', color: '#1a1a1a', fontWeight: '600' },
  issueBox: { background: '#f9fafb', borderRadius: '12px', padding: '16px', lineHeight: '1.7', fontSize: '14px', color: '#444' },
  badge: (color, bg) => ({ display: 'inline-block', padding: '5px 14px', borderRadius: '99px', fontSize: '13px', fontWeight: '600', color, background: bg }),
  textarea: { width: '100%', padding: '14px 16px', border: '1.5px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical', minHeight: '150px', outline: 'none', boxSizing: 'border-box', lineHeight: '1.6' },
  saveBtn: { padding: '12px 24px', background: '#1a6b4a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', marginTop: '12px' },
  attendBtn: { width: '100%', padding: '14px', background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px' },
  attendedBox: { background: '#d1fae5', borderRadius: '12px', padding: '16px', textAlign: 'center' },
  attendedText: { color: '#065f46', fontWeight: '700', fontSize: '15px' },
  confirmOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  confirmBox: { background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  confirmIcon: { fontSize: '52px', marginBottom: '16px' },
  confirmTitle: { fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' },
  confirmDesc: { fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '28px' },
  confirmBtns: { display: 'flex', gap: '12px', justifyContent: 'center' },
  confirmYes: { padding: '12px 28px', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' },
  confirmNo: { padding: '12px 28px', background: '#f4f4f4', color: '#666', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  savedMsg: { fontSize: '13px', color: '#1a6b4a', fontWeight: '600', marginTop: '8px' },
  loadingBox: { textAlign: 'center', padding: '80px 0', fontSize: '16px', color: '#999' },
};

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appt, setAppt] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [status, setStatus] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [prescSaved, setPrescSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem('adminToken');
  const headers = { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, { headers });
        const data = await res.json();
        setAppt(data);
        setPrescription(data.prescription || '');
        setStatus(data.status);
      } catch (err) {
        console.log('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleSavePrescription = async () => {
    try {
      await fetch(`http://localhost:5000/api/appointments/${id}/prescription`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ prescription }),
      });
      setPrescSaved(true);
      setTimeout(() => setPrescSaved(false), 3000);
    } catch (err) {
      alert('Failed to save prescription');
    }
  };

  const handleConfirmAttend = async () => {
    try {
      await fetch(`http://localhost:5000/api/appointments/${id}/attend`, {
        method: 'PATCH',
        headers,
      });
      setStatus('Attended');
      setShowConfirm(false);
      setTimeout(() => navigate('/admin/history'), 1500);
    } catch (err) {
      alert('Failed to mark as attended');
    }
  };

  if (loading) return <div style={styles.loadingBox}>Loading appointment...</div>;

  if (!appt) return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
      <h2 style={{ fontSize: '20px', color: '#666' }}>Appointment not found</h2>
      <Link to="/admin/appointments" style={{ color: '#1a6b4a', fontWeight: '600', marginTop: '12px', display: 'inline-block' }}>
        Back to Appointments
      </Link>
    </div>
  );

  return (
    <div style={styles.wrapper}>

      {showConfirm && (
        <div style={styles.confirmOverlay}>
          <div style={styles.confirmBox}>
            <div style={styles.confirmIcon}>✅</div>
            <div style={styles.confirmTitle}>Mark as Attended?</div>
            <div style={styles.confirmDesc}>
              Are you sure you want to mark this appointment for
              <strong> {appt.name}</strong> as attended?
              This will move it to the history page.
            </div>
            <div style={styles.confirmBtns}>
              <button style={styles.confirmNo} onClick={() => setShowConfirm(false)}>Cancel</button>
              <button style={styles.confirmYes} onClick={handleConfirmAttend}>Yes, Mark Attended</button>
            </div>
          </div>
        </div>
      )}

      <button style={styles.backBtn} onClick={() => navigate('/admin/appointments')}>
        Back to Appointments
      </button>

      <div style={styles.grid}>
        <div>
          <div style={styles.card}>
            <div style={styles.patientHeader}>
              <div style={styles.avatar}>{appt.name[0]}</div>
              <div>
                <div style={styles.patientName}>{appt.name}</div>
                <div style={styles.patientSub}>{appt.gender} - {appt.age} years old</div>
              </div>
            </div>
            <div style={styles.infoGrid}>
              {[
                { label: 'Phone', value: appt.phone },
                { label: 'Email', value: appt.email },
                { label: 'Service', value: appt.service },
                { label: 'Date', value: new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Time Slot', value: appt.slot },
                { label: 'Duration', value: appt.duration },
              ].map((item) => (
                <div key={item.label} style={styles.infoItem}>
                  <div style={styles.infoLabel}>{item.label}</div>
                  <div style={styles.infoValue}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Appointment Status</div>
            <div style={{ marginBottom: '16px' }}>
              <span style={styles.badge(
                status === 'Attended' ? '#065f46' : '#92400e',
                status === 'Attended' ? '#d1fae5' : '#fef3c7'
              )}>
                {status}
              </span>
            </div>
            {status === 'Attended' ? (
              <div style={styles.attendedBox}>
                <div style={styles.attendedText}>Appointment has been attended.</div>
              </div>
            ) : (
              <button style={styles.attendBtn} onClick={() => setShowConfirm(true)}>
                Mark as Attended
              </button>
            )}
          </div>
        </div>

        <div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Patient Issue and Description</div>
            <div style={styles.issueBox}>{appt.issue}</div>
          </div>

          {appt.cancelReason && (
            <div style={styles.card}>
              <div style={styles.cardTitle}>Cancellation Reason</div>
              <div style={{ background: '#fff0f0', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#cc0000', lineHeight: '1.7', border: '1px solid #ffcccc' }}>
                {appt.cancelReason}
              </div>
            </div>
          )}

          <div style={styles.card}>
            <div style={styles.cardTitle}>Prescription</div>
            <textarea
              style={styles.textarea}
              placeholder="Write prescription here..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button style={styles.saveBtn} onClick={handleSavePrescription}>
                Save Prescription
              </button>
              {prescSaved && <span style={styles.savedMsg}>Saved successfully!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;