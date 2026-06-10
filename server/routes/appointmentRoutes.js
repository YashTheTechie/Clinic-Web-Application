const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAllAppointments,
  getTodayAppointments,
  getAppointmentById,
  savePrescription,
  markAttended,
  getHistory,
  getMyAppointments,
  getPatientAppointmentById,
  cancelAppointment,
  rescheduleAppointment,
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Patient routes
router.post('/book', auth, bookAppointment);
router.get('/my', auth, getMyAppointments);
router.get('/patient/:id', auth, getPatientAppointmentById);
router.patch('/:id/cancel', auth, cancelAppointment);
router.patch('/:id/reschedule', auth, rescheduleAppointment);

// Admin routes
router.get('/all', adminAuth, getAllAppointments);
router.get('/today', adminAuth, getTodayAppointments);
router.get('/history', adminAuth, getHistory);
router.get('/:id', adminAuth, getAppointmentById);
router.patch('/:id/prescription', adminAuth, savePrescription);
router.patch('/:id/attend', adminAuth, markAttended);

module.exports = router;