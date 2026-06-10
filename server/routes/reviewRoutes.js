const express = require('express');
const router = express.Router();
const { addReview, getAllReviews } = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Public
router.get('/', getAllReviews);

// Protected
router.post('/add', auth, addReview);

module.exports = router;