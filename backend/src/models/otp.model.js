const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  fullname: String,
  password: String, // store hashed
  bio: String,
  profileImage: String,
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const otpModel = mongoose.model("otpTemp", otpSchema);

module.exports = otpModel