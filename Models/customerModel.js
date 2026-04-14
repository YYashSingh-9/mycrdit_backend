const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    minlength: [5, "Minimum 5 characters required. "],
    maxlength: [30, "Maximum 30 characters allowed. "],
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: [9, "10 characters are required"],
    maxlength: [10, "10 characters are required"],
  },
  transactionalScore: {
    type: Number,
    required: true,
  },
});

// --- IMPORTANT NOTE HERE --- //
// Password and it's authentication has been dropped due to testing of the " Quick in" concept
// Below are the previous code for password system..
// Customer name will be automatically be added with route middleware (for prototype version)

// -------------------------------------//
//   password: {
//     type: String,
//     required: [true, "You must have a password. "],
//     minlength: [8, "Password must be 8 characters long. "],
//     select: false,
//   },
//   confirmPassword: {
//     type: String,
//     required: [true, "Please provide confirm password. "],
//     minlength: [8, "Password must be 8 character long. "],
//     maxLength: [16, "Password must not exceed 16 characters."],

//     validate: {
//       validator: function (el) {
//         return el === this.password;
//       },
//     },
//   },
// customerSchema.pre("save", async function (next) {
//   // if password is not entered then return
//   if (!this.isModified("password")) return next();

//   // Hashing password
//   this.password = await bcrypt.hash(this.password, 12);

//   // No requirement to save confirm password
//   this.confirmPassword = undefined;
//   next();
// });

// customerSchema.methods.correctPassword = async function (
//   enteredPassword,
//   userPassword
// ) {
//   return bcrypt.compare(enteredPassword, userPassword);
// };

// ---------------------------------------------------------//
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
