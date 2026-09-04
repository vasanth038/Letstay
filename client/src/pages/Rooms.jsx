import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { apiRequest } from "../utils/api";

const Rooms = () => {
  const { state } = useLocation();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationFilter, setLocationFilter] = useState(state?.destination || "");

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      setError("");
      try {
        const query = locationFilter ? `?location=${encodeURIComponent(locationFilter)}` : "";
        const data = await apiRequest(`/api/rooms${query}`);
        setRooms(data.rooms);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [locationFilter]);

  return (
    <section className="py-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Explore Our Rooms</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Discover comfortable and luxurious rooms designed to make your stay
          memorable.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Filter by location..."
          className="border border-gray-300 rounded-full px-5 py-2 text-sm outline-none w-full max-w-xs"
        />
      </div>

      {isLoading && <p className="text-center text-gray-400">Loading rooms...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && rooms.length === 0 && (
        <p className="text-center text-gray-400">No rooms match that location yet.</p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Rooms;
