import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    image: { type: String, required: true },
    roomType: { type: String, required: true },
    amenities: { type: [String], default: [] },
    description: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
