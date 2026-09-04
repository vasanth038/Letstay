import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchBookings = async () => {
    try {
      const data = await apiRequest("/api/bookings/me");
      setBookings(data.bookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePay = async (id) => {
    setActionError("");
    try {
      await apiRequest(`/api/bookings/${id}/pay`, { method: "PATCH" });
      fetchBookings();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleCancel = async (id) => {
    setActionError("");
    try {
      await apiRequest(`/api/bookings/${id}/cancel`, { method: "PATCH" });
      fetchBookings();
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <section className="py-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-3xl font-semibold mb-8">My Bookings</h1>

      {isLoading && <p className="text-gray-400">Loading your bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {actionError && <p className="text-red-500 mb-4">{actionError}</p>}

      {!isLoading && !error && bookings.length === 0 && (
        <p className="text-gray-400">You haven't booked a room yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row gap-4 border border-gray-200 rounded-xl p-4"
          >
            <img
              src={booking.room?.image}
              alt={booking.room?.name}
              className="w-full md:w-40 h-32 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-lg font-semibold">{booking.room?.name}</h2>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      statusStyles[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.isPaid && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      Paid
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">{booking.room?.location}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {new Date(booking.checkInDate).toLocaleDateString()} &rarr;{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()} · {booking.guests}{" "}
                  guest{booking.guests > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold">${booking.totalPrice}</p>

                {booking.status !== "cancelled" && (
                  <div className="flex gap-2">
                    {!booking.isPaid && (
                      <button
                        onClick={() => handlePay(booking._id)}
                        className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookings;
