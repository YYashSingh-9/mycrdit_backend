const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const proprietorSchema = mongoose.Schema({
  ProprietorName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  shopName: {
    type: String,
    required: [true, "Shop name is required"],
    maxLength: [25, "Maximum 20 characters allowed"],
    minLength: [7, "Please provide original and proper name"],
  },
  shopAddress: {
    type: String,
    required: [true, "Please enter Shop address"],
    minLength: [20, "Address should be clear and specific."],
  },
  state: {
    type: String,
    required: [true, "Please enter state."],
  },
  pincode: {
    type: Number,
    required: [true, "Pincode is required"],
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
  },
  shopCategory: {
    type: String,
    required: [true, "Please provide your niche."],
  },
  otherShopCategory: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide contact number"],
    minLength: [10, "Check your number."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [5, "Password must be at least 5 characters long"],
    maxLength: [16, "Password must not exceed 16 characters."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter password"],
    minLength: [5, "Password must be at least 5 characters long"],
    maxLength: [16, "Password must not exceed 16 characters."],
    validate: function (el) {
      return el === this.password;
    },
  },
  mostSellingProduct: {
    type: String,
    minLength: [5, "Better and more description required."],
    maxLength: [20, "Product description getting too long"],
  },
  leastSellingProduct: {
    type: String,
    minLength: [5, "Better and more description required."],
    maxLength: [20, "Product description getting too long"],
  },
  proprietorDemand: {
    type: String,
    minLength: [5, "Better and more description required."],
    maxLength: [50, "Max characters reached"],
  },
  proprietorGST: {
    type: Number,
    minLength: [15, "15 digit number is required"],
    maxLength: [15, "15 digit number is required"],
  },
});

proprietorSchema.pre("save", async function (next) {
  //1.
  if (!this.isModified("password")) return next();

  //2.
  this.password = await bcrypt.hash(this.password, 12);

  //3.
  this.confirmPassword = undefined;

  //4.
  next();
});
proprietorSchema.methods.correctPassword = async function (
  enteredPassword,
  user_password
) {
  return bcrypt.compare(enteredPassword, user_password);
};

const Proprietor = mongoose.model("Proprietor", proprietorSchema);
module.exports = Proprietor;
