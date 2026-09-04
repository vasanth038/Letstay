
import mongoose from "mongoose";
import "dotenv/config";
import Hotel from "./models/hotel.js";
import Room from "./models/room.js";
import Offer from "./models/offer.js";

const hotels = [
  {
    name: "The Grand Resort",
    location: "Maldives",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    badge: "Best Seller",
  },
  {
    name: "Alpine Lodge",
    location: "Switzerland",
    price: 399,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
    badge: "Best Seller",
  },
  {
    name: "Skyline Hotel",
    location: "New York",
    price: 349,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    badge: "Best Seller",
  },
  {
    name: "Desert Oasis Resort",
    location: "Dubai",
    price: 499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
    badge: "New",
  },
];

const rooms = [
  {
    name: "Deluxe Ocean View Room",
    location: "Maldives",
    price: 299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
    roomType: "Deluxe Room",
    amenities: ["Free WiFi", "Breakfast", "Ocean View"],
    description:
      "Wake up to panoramic ocean views in this spacious deluxe room, featuring a private balcony, plush king bed, and modern en-suite bathroom.",
  },
  {
    name: "Luxury Mountain Suite",
    location: "Switzerland",
    price: 399,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
    roomType: "Luxury Suite",
    amenities: ["Free WiFi", "Room Service", "Mountain View"],
    description:
      "A cozy alpine retreat with floor-to-ceiling windows overlooking the mountains, a fireplace lounge, and heated flooring throughout.",
  },
  {
    name: "Modern City Room",
    location: "New York",
    price: 249,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=800",
    roomType: "Premium Room",
    amenities: ["Free WiFi", "Breakfast", "City View"],
    description:
      "Sleek, contemporary design in the heart of the city, with skyline views and easy access to shopping and dining.",
  },
  {
    name: "Premium Pool Villa",
    location: "Dubai",
    price: 499,
    rating: 5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
    roomType: "Private Villa",
    amenities: ["Pool Access", "Room Service", "Free Breakfast"],
    description:
      "A private villa with your own plunge pool, spacious outdoor terrace, and dedicated butler service.",
  },
  {
    name: "Cozy Single Room",
    location: "London",
    price: 179,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=800",
    roomType: "Single Room",
    amenities: ["Free WiFi", "Breakfast"],
    description:
      "A compact, comfortable room perfect for solo travelers, just steps away from London's major attractions.",
  },
  {
    name: "Executive Double Suite",
    location: "Singapore",
    price: 349,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611094016919-36f3138ba3f7?q=80&w=800",
    roomType: "Double Suite",
    amenities: ["Free WiFi", "Room Service", "Pool Access"],
    description:
      "A spacious suite with two queen beds, ideal for families, with access to the rooftop infinity pool.",
  },
  {
    name: "Luxury Garden Room",
    location: "Bali",
    price: 279,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800",
    roomType: "Garden View",
    amenities: ["Free Breakfast", "Room Service"],
    description:
      "Surrounded by tropical gardens, this room offers a peaceful escape with an open-air rain shower.",
  },
  {
    name: "Royal Premium Suite",
    location: "Paris",
    price: 599,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800",
    roomType: "Royal Suite",
    amenities: ["Free WiFi", "Breakfast", "Room Service"],
    description:
      "Elegant Parisian decor, a marble bathroom, and views of the city's iconic rooftops from your private balcony.",
  },
];

const offers = [
  {
    title: "Summer Escape Package",
    description: "Enjoy a complimentary night and daily breakfast",
    priceOff: 25,
    expiryDate: "Aug 31",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800",
  },
  {
    title: "Romantic Getaway",
    description: "Special couples package including spa treatment",
    priceOff: 20,
    expiryDate: "Sep 20",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800",
  },
  {
    title: "Luxury Retreat",
    description:
      "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.",
    priceOff: 30,
    expiryDate: "Sep 25",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("MongoDB connected — seeding...");

    await Promise.all([Hotel.deleteMany({}), Room.deleteMany({}), Offer.deleteMany({})]);

    await Hotel.insertMany(hotels);
    await Room.insertMany(rooms);
    await Offer.insertMany(offers);

    console.log("Seed complete: hotels, rooms, and offers created.");
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
