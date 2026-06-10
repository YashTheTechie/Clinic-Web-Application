const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Patient
const registerPatient = async (req, res) => {
  try {
    const { fullName, email, phone, age, gender, password } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create patient
    const patient = await Patient.create({
      fullName,
      email,
      phone,
      age,
      gender,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      patient: {
        id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
        phone: patient.phone,
        age: patient.age,
        gender: patient.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login Patient
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      patient: {
        id: patient._id,
        fullName: patient.fullName,
        email: patient.email,
        phone: patient.phone,
        age: patient.age,
        gender: patient.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Patient Profile
const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerPatient, loginPatient, getPatientProfile };