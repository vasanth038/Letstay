import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { apiRequest } from "../utils/api";

const ListProperty = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user?.role === "owner") {
    navigate("/dashboard");
    return null;
  }

  const handleBecomeOwner = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const data = await apiRequest("/api/users/become-owner", { method: "PATCH" });
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 pb-16 px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center text-center">
      <h1 className="text-3xl font-semibold">List Your Property</h1>
      <p className="text-gray-500 mt-3 max-w-lg">
        Switch your account to an owner account to list rooms, track incoming
        bookings, and manage your listings from a dedicated dashboard.
      </p>

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      <button
        onClick={handleBecomeOwner}
        disabled={isSubmitting}
        className="bg-black text-white px-8 py-3 rounded-full text-sm mt-6 hover:bg-gray-800 transition disabled:opacity-60"
      >
        {isSubmitting ? "Setting up..." : "Become an Owner"}
      </button>
    </section>
  );
};

export default ListProperty;
