const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  role: {
    type: Boolean,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
