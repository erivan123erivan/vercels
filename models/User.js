const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      unique: true
    },
    userName: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    image: {
      type: String
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
