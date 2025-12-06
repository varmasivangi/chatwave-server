import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer  from "nodemailer";
import jwt from "jsonwebtoken"

export const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, gender } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailToken = jwt.sign({email},process.env.JWT_SECRET,{ expiresIn: '1d' })

    // Create user (Mongoose will auto-fill defaults)
    const newUser = new User({
      name,
      username,
      email,
      phone,
      gender,
      isVerified: false,
      password: hashedPassword,
     
    });

    await newUser.save();

    res.status(201).json({
      statusCode: 200,
      message: "User created successfully",
      userId: newUser._id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
