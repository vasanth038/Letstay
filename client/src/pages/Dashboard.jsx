import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const emptyForm = {
  name: "",
  location: "",
  price: "",
  image: "",
  roomType: "",
  amenities: "",
  description: "",
};

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [roomsData, bookingsData] = await Promise.all([
        apiRequest("/api/rooms/mine"),
        apiRequest("/api/bookings/owner"),
      ]);
      setRooms(roomsData.rooms);
      setBookings(bookingsData.bookings);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.location || !form.price || !form.image || !form.roomType) {
      setFormError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest("/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          amenities: form.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
        }),
      });
      setForm(emptyForm);
      loadData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await apiRequest(`/api/rooms/${id}`, { method: "DELETE" });
      loadData();
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <section className="py-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-semibold mb-8">Owner Dashboard</h1>

      {formError && <p className="text-red-500 mb-4">{formError}</p>}

      {/* Add room form */}
      <div className="border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">List a new room</h2>
        <form onSubmit={handleAddRoom} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Room name"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price per night"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          />
          <input
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            placeholder="Room type (e.g. Deluxe Room)"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none md:col-span-2"
          />
          <input
            name="amenities"
            value={form.amenities}
            onChange={handleChange}
            placeholder="Amenities, comma separated"
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none md:col-span-2"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none md:col-span-2"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition md:col-span-2 md:w-fit disabled:opacity-60"
          >
            {isSubmitting ? "Adding..." : "Add Room"}
          </button>
        </form>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading your dashboard...</p>
      ) : (
        <>
          {/* Your listings */}
          <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
          {rooms.length === 0 && (
            <p className="text-gray-400 mb-10">You haven't listed any rooms yet.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {rooms.map((room) => (
              <div key={room._id} className="border border-gray-200 rounded-lg overflow-hidden">
                <img src={room.image} alt={room.name} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium">{room.name}</h3>
                  <p className="text-sm text-gray-500">
                    {room.location} · ${room.price}/night
                  </p>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="text-red-500 text-sm mt-3 hover:underline"
                  >
                    Remove listing
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Incoming bookings */}
          <h2 className="text-xl font-semibold mb-4">Bookings for Your Rooms</h2>
          {bookings.length === 0 && (
            <p className="text-gray-400">No bookings yet for your listings.</p>
          )}
          <div className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4 text-sm"
              >
                <div>
                  <p className="font-medium">{booking.room?.name}</p>
                  <p className="text-gray-500">
                    {booking.user?.username} · {new Date(booking.checkInDate).toLocaleDateString()}{" "}
                    &rarr; {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${booking.totalPrice}</span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
