import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, gender } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

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

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const url = `http://localhost:4200/verify-email?token=${emailToken}`;

    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `Hello ${name},<br> Please verify your email by clicking this link: <a href="${url}">${url}</a>`,
    });

    res.status(201).json({
      statusCode: 200,
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id name username profileImage bio isVerified followersCount followingCount postsCount"
    );

    res.status(200).send({
      statusCode: 200,
      message: "success",
      data: users
    });

  } catch (error) {

    res.status(500).send({
      statusCode: 500,
      message: "Server Error",
      error: error.message
    });

  }
};


export const getUserProfile = async (req, res) => {
  try {
    const userID = req.body.userID;

    if (!userID) {
      return res.status(400).send({
        statusCode: 400,
        message: "userID is required"
      });
    }

    const userDetails = await User.findById(userID).select("_id name username bio profileImage coverImage isVerified followersCount followingCount postsCount reelsCount");

    if (!userDetails) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found"
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "success",
      data: userDetails
    });

  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Server Error",
      error: error.message
    });
  }
};
