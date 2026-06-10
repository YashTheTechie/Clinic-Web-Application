const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: 'Mumbai',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);