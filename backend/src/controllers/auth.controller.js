import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import config from "../config/config.js";

// ---------------- REGISTER ----------------

export const registerUser = async (req, res) => {
  try {
    const { username, phone, password, busNumber, adminNumber, email, role } = req.body;

    // Dynamic uniqueness check
    let query = [];
    if (phone) query.push({ phone });
    if (role === "driver" && busNumber) query.push({ busNumber });
    if (role === "admin" && email) query.push({ email });

    if (query.length > 0) {
      const existingUser = await User.findOne({ $or: query });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with given credentials" });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      phone,
      password: hashedPassword,
      busNumber: role === "driver" ? busNumber : undefined,
      adminNumber: role === "admin" ? adminNumber : undefined,
      email: role === "admin" ? email : undefined,
      role
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      config.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, username: newUser.username, role: newUser.role }
    });

  } catch (err) {
    console.error("❌ Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by phone, email, or username
    const user = await User.findOne({
      $or: [
        { phone: identifier },
        { email: identifier },
        { username: identifier }
      ],
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

