const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username !== validUsername || password !== validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username, isAdmin: true },
      process.env.ADMIN_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Admin Stats
const getAdminStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const todayStr = new Date().toLocaleDateString('en-CA');

    const todayAppointments = await Appointment.countDocuments({ date: todayStr });
    const attendedToday = await Appointment.countDocuments({
      date: todayStr,
      status: 'Attended',
    });
    const totalCancelled = await Appointment.countDocuments({ status: 'Cancelled' });

    res.status(200).json({
      totalPatients,
      totalAppointments,
      todayAppointments,
      attendedToday,
      totalCancelled,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { adminLogin, getAdminStats, getAllPatients };