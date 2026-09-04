import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 86400000,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching the user" });
  }
});

router.patch("/become-owner", requireAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { role: "owner" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, COOKIE_OPTIONS);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong updating your role" });
  }
});

export default router;
