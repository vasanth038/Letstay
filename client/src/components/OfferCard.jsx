const OfferCard = ({ offer }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg border border-gray-300 h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${offer.image})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 h-full flex flex-col justify-end p-5">
        <span className="absolute top-3 left-3 bg-white text-black text-sm px-3 py-1 rounded-full font-medium">
          {offer.priceOff}% OFF
        </span>
        <h3 className="text-white text-xl font-semibold">{offer.title}</h3>
        <p className="text-gray-200 text-sm mt-1">{offer.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-200 text-sm">Expires {offer.expiryDate}</p>
          <button className="text-white text-sm font-semibold border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
            View Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
