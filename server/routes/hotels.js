import express from "express";
import Hotel from "../models/hotel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json({ hotels });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching hotels" });
  }
});

export default router;
