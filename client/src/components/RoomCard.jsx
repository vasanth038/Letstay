import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
      <div className="md:w-60">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-56 md:h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{room.location}</p>
            </div>
            <span className="text-sm">★ {room.rating}</span>
          </div>

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
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-2xl font-semibold">${room.price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>

          <Link
            to={`/rooms/${room._id}`}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
