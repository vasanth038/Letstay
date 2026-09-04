import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { apiRequest } from "../utils/api";

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAppContext();

  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await apiRequest(`/api/rooms/${roomId}`);
        setRoom(data.room);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!user) {
      navigate("/login");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      setBookingError("Please select check-in and check-out dates");
      return;
    }

    setIsBooking(true);
    try {
      await apiRequest("/api/bookings", {
        method: "POST",
        body: JSON.stringify({ roomId, checkInDate, checkOutDate, guests }),
      });
      setBookingSuccess("Booking created! You can pay and manage it from My Bookings.");
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return <p className="text-center py-32 text-gray-400">Loading room...</p>;
  }

  if (error || !room) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800">Room not found</h2>
        <Link to="/rooms" className="text-blue-600 underline mt-3">
          Back to all rooms
        </Link>
      </div>
    );
  }

  return (
    <section className="py-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <Link to="/rooms" className="text-sm text-gray-500 hover:text-gray-800 transition">
        &larr; Back to rooms
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-80 md:h-full object-cover rounded-xl"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold">{room.name}</h1>
          <p className="text-gray-500 mt-1">{room.location}</p>

          <div className="flex items-center gap-1 mt-3 text-sm">
            <span>★ {room.rating}</span>
            <span className="text-gray-400">· {room.roomType}</span>
          </div>

          <p className="text-gray-600 mt-5 leading-6">{room.description}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {room.amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <span className="text-3xl font-semibold">${room.price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>

          {/* Booking form */}
          <form
            onSubmit={handleBooking}
            className="mt-6 border-t pt-6 flex flex-col sm:flex-row gap-3 flex-wrap"
          >
            <div className="flex flex-col text-sm">
              <label htmlFor="checkInDate" className="text-gray-500 mb-1">
                Check in
              </label>
              <input
                id="checkInDate"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="checkOutDate" className="text-gray-500 mb-1">
                Check out
              </label>
              <input
                id="checkOutDate"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col text-sm">
              <label htmlFor="guests" className="text-gray-500 mb-1">
                Guests
              </label>
              <input
                id="guests"
                type="number"
                min={1}
                max={8}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 text-sm outline-none w-20"
              />
            </div>

            <button
              type="submit"
              disabled={isBooking}
              className="bg-black text-white px-6 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition self-end disabled:opacity-60"
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          </form>

          {bookingError && <p className="text-red-500 text-sm mt-3">{bookingError}</p>}
          {bookingSuccess && (
            <p className="text-green-600 text-sm mt-3">
              {bookingSuccess}{" "}
              <Link to="/my-bookings" className="underline">
                View bookings
              </Link>
            </p>
          )}
          {!user && (
            <p className="text-gray-400 text-xs mt-2">
              You'll need to{" "}
              <Link to="/login" className="underline">
                log in
              </Link>{" "}
              to complete a booking.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
