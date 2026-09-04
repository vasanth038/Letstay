import express from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 86400000, 
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};


router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty().isString(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
    check("email", "A valid email is required").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = new User(req.body);
      await user.save();

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, COOKIE_OPTIONS);
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong during registration" });
    }
  }
);


router.post(
  "/login",
  [
    check("email", "A valid email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("auth_token", token, COOKIE_OPTIONS);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong during login" });
    }
  }
);


router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", { ...COOKIE_OPTIONS, maxAge: 0 });
  res.status(200).json({ message: "Logged out" });
});

export default router;
