const express = require('express');
const router = express.Router();
const { registerPatient, loginPatient, getPatientProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', registerPatient);
router.post('/login', loginPatient);

// Protected routes
router.get('/profile', auth, getPatientProfile);

module.exports = router;