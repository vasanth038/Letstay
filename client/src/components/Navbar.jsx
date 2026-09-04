import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const location = useLocation();
  const { user, logout } = useAppContext();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

 
  const darkNavbar = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between
      px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 ${
        darkNavbar
          ? "py-5 md:py-6"
          : "bg-white/90 shadow-md backdrop-blur-lg py-4"
      }`}
    >
   
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <img
          src={assets.logo}
          alt="Hotel Booking"
          className="h-9 md:h-10 w-auto"
        />
      </Link>

      
      <div className="hidden md:flex items-center gap-6 lg:gap-9">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={`group relative flex flex-col text-base font-medium ${
              darkNavbar ? "text-white" : "text-gray-700"
            }`}
          >
            {({ isActive }) => (
              <>
                {link.name}

                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    darkNavbar ? "bg-white" : "bg-gray-700"
                  } ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}

   
        {user && (
          <Link
            to={user.role === "owner" ? "/dashboard" : "/list-property"}
            className={`border px-5 py-2 text-base rounded-full transition-all ${
              darkNavbar
                ? "text-white border-white hover:bg-white hover:text-black"
                : "text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
          >
            {user.role === "owner" ? "Dashboard" : "List Your Property"}
          </Link>
        )}

        {user && (
          <Link
            to="/my-bookings"
            className={`text-base font-medium ${
              darkNavbar ? "text-white" : "text-gray-700"
            } hover:opacity-80 transition`}
          >
            My Bookings
          </Link>
        )}
      </div>

      
      <div className="hidden md:flex items-center gap-5">
        {/* Search */}
        <button
          type="button"
          className="cursor-pointer"
          aria-label="Search"
        >
          <img
            src={assets.searchIcon}
            alt="Search"
            className={`h-6 w-6 transition-all ${
              darkNavbar ? "brightness-0 invert" : ""
            }`}
          />
        </button>

       
        {user ? (
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-medium ${
                darkNavbar ? "text-white" : "text-gray-700"
              }`}
            >
              Hi, {user.username}
            </span>
            <button
              type="button"
              onClick={logout}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                darkNavbar
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className={`px-8 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${
              darkNavbar
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Login
          </Link>
        )}
      </div>

     
      <button
        type="button"
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <img
          src={assets.menuIcon}
          alt="Menu"
          className={`h-6 w-6 ${
            darkNavbar ? "brightness-0 invert" : ""
          }`}
        />
      </button>

      
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center
        gap-8 text-gray-800 transition-transform duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5 cursor-pointer"
          aria-label="Close menu"
        >
          <img
            src={assets.closeIcon}
            alt="Close"
            className="h-7 w-7"
          />
        </button>

       
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl font-medium transition-colors ${
                isActive
                  ? "text-black"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {user && (
          <Link
            to={user.role === "owner" ? "/dashboard" : "/list-property"}
            onClick={() => setIsMenuOpen(false)}
            className="border border-gray-400 px-6 py-2.5 rounded-full text-base font-medium hover:bg-gray-100 transition"
          >
            {user.role === "owner" ? "Dashboard" : "List Your Property"}
          </Link>
        )}

        {user && (
          <Link
            to="/my-bookings"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
          >
            My Bookings
          </Link>
        )}

        
        {user ? (
          <button
            type="button"
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-9 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="bg-black text-white px-9 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
