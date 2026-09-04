import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-3 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
