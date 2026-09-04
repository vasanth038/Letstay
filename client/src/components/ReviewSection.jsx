import { testimonials } from "../assets/assets";
import ReviewCard from "./ReviewCard";

const ReviewSection = () => {
  return (
    <section className="py-16 px-4 md:px-16 lg:px-24 xl:px-32 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">What Our Guests Say</h2>
        <p className="text-gray-500 mt-2">
          Discover why travelers love booking their stays with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((reviewer) => (
          <ReviewCard key={reviewer.id} reviewer={reviewer} />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
