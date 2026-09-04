const HotelCard = ({ hotel }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-300 ">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-50 object-cover"
        />
        <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded-md">
          {hotel.badge}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">{hotel.name}</h3>
          <span className="text-xs px-3">⭐ {hotel.rating}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{hotel.location}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-medium">
            ${hotel.price}
            <span className="text-xs text-gray-400"> /night</span>
          </p>
          <button className="border border-gray-300 px-3 py-2 text-xs rounded-md hover:bg-gray-100 transition">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
