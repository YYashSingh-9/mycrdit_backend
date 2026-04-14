const mongoose = require("mongoose");

const paidNoteSchema = mongoose.Schema({
  debtNote_Id: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Note Id missing."],
  },
  customerNumber: {
    type: Number,
    required: [true, "Customer Number required"],
  },
  paymentDate: {
    type: Date,
    required: [true, "Payment date missing."],
  },
  thirtyDayPayment: {
    type: Boolean,
    required: [true, "30 day payment information required."],
  },
  lengthOfDebt: {
    type: Number,
    required: [true, "Total number of days required."],
  },
});

const PaidNote = mongoose.model("PaidNote", paidNoteSchema);
module.exports = PaidNote;
