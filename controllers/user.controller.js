import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generate_token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name is required!",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required!",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Password is required!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exist with this email",
      });
    }

    //hashed password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      status: true,
      message: "Account created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required!",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Password is required!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: false,
        message: "Incorrect email or password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to login",
    });
  }
};
