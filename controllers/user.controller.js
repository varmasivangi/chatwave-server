import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, phone, password, profileImage } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // Create new user
    const newUser = new User({ name, username, email, phone, password, profileImage });
    await newUser.save();

    res.status(201).json({statusCode: 200, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
