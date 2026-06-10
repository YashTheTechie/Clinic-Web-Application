const Review = require('../models/Review');

// Add Review
const addReview = async (req, res) => {
  try {
    const { rating, comment, service, location } = req.body;

    const existingReview = await Review.findOne({ patient: req.patient.id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already submitted a review' });
    }

    const review = await Review.create({
      patient: req.patient.id,
      name: req.body.name,
      rating,
      comment,
      service,
      location,
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Reviews
const getAllReviews = async (req, res) => {
  try {
    const { sort } = req.query;
    let sortOption = { createdAt: -1 };

    if (sort === 'highest') sortOption = { rating: -1 };
    if (sort === 'lowest') sortOption = { rating: 1 };
    if (sort === 'recent') sortOption = { createdAt: -1 };

    const reviews = await Review.find().sort(sortOption);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addReview, getAllReviews };