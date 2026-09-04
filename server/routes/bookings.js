import express from "express";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import requireAuth from "../middleware/auth.js";
import requireRole from "../middleware/role.js";

const router = express.Router();

const nightsBetween = (checkIn, checkOut) => {
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

router.post("/", requireAuth, async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Room and dates are required" });
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return res.status(400).json({ message: "Check-out must be after check-in" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ message: "This room is not currently available" });
    }

    const nights = nightsBetween(checkInDate, checkOutDate);
    const totalPrice = nights * room.price;

    const booking = new Booking({
      room: room.id,
      user: req.userId,
      checkInDate,
      checkOutDate,
      guests: guests || 1,
      totalPrice,
    });

    await booking.save();
    const populated = await booking.populate("room");

    res.status(201).json({ booking: populated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong creating the booking" });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate("room")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching your bookings" });
  }
});

router.get("/owner", requireAuth, requireRole("owner"), async (req, res) => {
  try {
    const rooms = await Room.find({ owner: req.userId }).select("_id");
    const roomIds = rooms.map((r) => r._id);

    const bookings = await Booking.find({ room: { $in: roomIds } })
      .populate("room")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong fetching bookings" });
  }
});

router.patch("/:id/pay", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (String(booking.user) !== String(req.userId)) {
      return res.status(403).json({ message: "This isn't your booking" });
    }

    booking.isPaid = true;
    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({ booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong processing payment" });
  }
});

router.patch("/:id/cancel", requireAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isBookingOwner = String(booking.user) === String(req.userId);
    const isRoomOwner = String(booking.room.owner) === String(req.userId);

    if (!isBookingOwner && !isRoomOwner) {
      return res.status(403).json({ message: "You can't cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong cancelling the booking" });
  }
});

export default router;
