const ReviewCard = ({ reviewer }) => {
  return (
    <div className="bg-white text-gray-800 border border-gray-300 p-5 rounded-lg">
      <div className="flex items-center gap-3">
        <img
          src={reviewer.image}
          alt={reviewer.name}
          className="rounded-full h-12 w-12 object-cover"
        />
        <div>
          <h2 className="font-semibold">{reviewer.name}</h2>
          <h4 className="text-sm text-gray-500">{reviewer.address}</h4>
        </div>
      </div>
      <div className="mt-4 text-sm px-3">⭐ {reviewer.rating}</div>
      <p className="text-gray-600 text-sm leading-6 mt-3">{reviewer.review}</p>
    </div>
  );
};

export default ReviewCard;
