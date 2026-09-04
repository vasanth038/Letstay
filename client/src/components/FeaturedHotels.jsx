import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { apiRequest } from "../utils/api";

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await apiRequest("/api/hotels");
        setHotels(data.hotels);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Featured Hotels</h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Discover our handpicked selection of exceptional properties around
          the world, offering unparalleled luxury and unforgettable
          experiences.
        </p>
      </div>

      {isLoading && <p className="text-center text-gray-400">Loading hotels...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedHotels;
