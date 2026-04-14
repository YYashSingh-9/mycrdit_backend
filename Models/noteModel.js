const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
    minLength: [5, "Minimum 5 characters are required."],
  },
  proprietorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  customerName: {
    type: String,
    required: [true, "Provide customer name."],
    minLength: [5, "Minimum 5 characters are required."],
  },
  customerNumber: {
    type: Number,
    required: [true, "Please provide customer number."],
    minLength: [10, "10 characters are required."],
    maxLength: [10, "10 characters reached."],
  },
  productBrand: {
    type: String,
    required: [true, "Provide product brand name."],
    minLength: [5, "Minimum 5 characters are required."],
    maxLength: [30, "Reached 30 characters limit."],
  },
  productName: {
    type: String,
    required: [true, "Please provide product name."],
    minLength: [5, "Minimum 5 characters required."],
    maxLength: [30, "Reached 30 characters limit."],
  },
  amount: {
    type: Number,
    required: [true, "Enter debt amount."],
    minLength: [1, "Minimum 1 digit amount is required."],
  },
  date: {
    type: Date,
    required: [true, "Please provide current date."],
  },
  cleared: {
    type: Boolean,
  },
  acceptanceStatus: {
    type: Boolean,
  },

  deleted: {
    type: Boolean,
  },
  rated: {
    type: Boolean,
  },
  proprietor_name: {
    type: String,
    required: [true, "Proprietor name is missing."],
  },
});

const DebtNote = mongoose.model("DebtNote", noteSchema);

module.exports = DebtNote;
