import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  profileImage: {
    type: String,
    default: ""
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
