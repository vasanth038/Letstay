import { useEffect, useState } from "react";
import OfferCard from "./OfferCard.jsx";
import { apiRequest } from "../utils/api";

const ExclusiveOffer = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await apiRequest("/api/offers");
        setOffers(data.offers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Exclusive Offers</h1>
        <p className="text-gray-500 mt-2">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>

      {isLoading && <p className="text-center text-gray-400">Loading offers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ExclusiveOffer;
