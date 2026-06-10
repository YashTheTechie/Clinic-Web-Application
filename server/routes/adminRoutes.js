const express = require('express');
const router = express.Router();
const { adminLogin, getAdminStats, getAllPatients } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Public
router.post('/login', adminLogin);

// Protected
router.get('/stats', adminAuth, getAdminStats);
router.get('/patients', adminAuth, getAllPatients);

module.exports = router;