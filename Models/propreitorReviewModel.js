const mongoose = require("mongoose");

const proprietorReviewSchema = mongoose.Schema({
  proprietorName: {
    type: String,
    required: [true, "Name required."],
  },
  brandName: {
    type: String,
    required: [true, "Provide Brand name"],
    minLength: [5, "Minimum 5 characters required."],
    maxLength: [30, "Maximum 30 characters reached."],
  },
  pincode: {
    type: Number,
    required: [true, "Provide your shop's pincode"],
    minLength: [6, "6 Characters required."],
    maxLength: [6, "6 Characters required."],
  },
  title: {
    type: String,
    minLength: [5, "Minimum 5 characters required."],
    required: [true, "Enter title."],
    maxLength: [30, "Maximum 30 characters reached."],
  },
  reviewContent: {
    type: String,
    required: [true, "Please write your review."],
    minLength: [30, "Minimum 30 characters are required."],
    maxLength: [280, "Maxmimum 280 characters limit reached."],
  },
  proprietorId: {
    type: mongoose.Schema.ObjectId,
  },
});

const ProprietorReview = mongoose.model(
  "ProprietorReview",
  proprietorReviewSchema
);
module.exports = ProprietorReview;
