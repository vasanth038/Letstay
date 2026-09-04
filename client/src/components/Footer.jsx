import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-500 px-5 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <Link to="/">
            <img src={assets.logo} alt="HotelBooking" className="h-10 mb-4" />
          </Link>
          <p className="text-gray-500 text-sm leading-6">
            Discover comfortable stays, amazing destinations, and
            unforgettable travel experiences with HotelBooking.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-800 transition">
              Home
            </Link>
            <Link to="/rooms" className="hover:text-gray-800 transition">
              Hotels
            </Link>
            <Link to="/experience" className="hover:text-gray-800 transition">
              Experience
            </Link>
            <Link to="/about" className="hover:text-gray-800 transition">
              About Us
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <Link to="/contact" className="hover:text-gray-800 transition">
              Contact Us
            </Link>
            <a href="#" className="hover:text-gray-800 transition">
              Help Center
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-800 transition">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <p>support@hotelbooking.com</p>
            <p>+91 1111111</p>
            <p>Available 24/7</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-300 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} HotelBooking. All rights reserved.</p>
        <p>Built for better travel experiences.</p>
      </div>
    </footer>
  );
};

export default Footer;
