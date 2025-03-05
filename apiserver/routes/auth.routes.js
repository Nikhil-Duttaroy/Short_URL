import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const validateRegisterInput = (username, password) => {
  if (!username || !password) {
    return "Username and password are required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

const validateLoginInput = (username, password) => {
  if (!username || !password) {
    return "Username and password are required.";
  }
  return null;
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const validationError = validateRegisterInput(username, password);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists." });
    }
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const validationError = validateLoginInput(username, password);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(201).json({ success: true, token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;