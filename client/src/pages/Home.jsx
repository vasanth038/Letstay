import Hero from "../components/Hero";
import FeaturedHotels from "../components/FeaturedHotels";
import ExclusiveOffer from "../components/ExclusiveOffer";
import ReviewSection from "../components/ReviewSection";
import Contact from "../components/ContactCard";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedHotels />
      <ExclusiveOffer />
      <ReviewSection />
      <Contact />
    </>
  );
};

export default Home;
