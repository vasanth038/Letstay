import express from "express";
import Room from "../models/room.js";
import requireAuth from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: "i" };
    }

    const rooms = await Room.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching rooms" });
  }
});

router.get("/mine", requireAuth, requireRole("owner"), async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching your rooms" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching the room" });
  }
});

router.post("/", requireAuth, requireRole("owner"), async (req, res) => {
  try {
    const { name, location, price, image, roomType, amenities, description } = req.body;

    if (!name || !location || !price || !image || !roomType) {
      return res.status(400).json({ message: "Missing required room fields" });
    }

    const room = new Room({
      name,
      location,
      price,
      image,
      roomType,
      amenities: amenities || [],
      description: description || "",
      owner: req.userId,
    });

    await room.save();
    res.status(201).json({ room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong creating the room" });
  }
});

router.put("/:id", requireAuth, requireRole("owner"), async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (String(room.owner) !== String(req.userId)) {
      return res.status(403).json({ message: "You don't own this room" });
    }

    Object.assign(room, req.body);
    await room.save();
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong updating the room" });
  }
});

router.delete("/:id", requireAuth, requireRole("owner"), async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (String(room.owner) !== String(req.userId)) {
      return res.status(403).json({ message: "You don't own this room" });
    }

    await room.deleteOne();
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong deleting the room" });
  }
});

export default router;
