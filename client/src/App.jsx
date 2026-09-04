import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignUp from "./components/signUp";
import Login from "./components/login";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import ListProperty from "./pages/ListProperty";
import NotFound from "./pages/NotFound";
import ContactCard from "./components/ContactCard";
import About from "./components/About";
const App = () => {
  const { pathname } = useLocation();

  const isOwnerPath = pathname.includes("owner");
  const isSignUp = pathname.includes("signup");
  const isLogin = pathname.includes("login");

  const hideChrome = isOwnerPath || isSignUp || isLogin;

  return (
    <div>
      {!hideChrome && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/contact" element = {<ContactCard />} />
          <Route path="/about" element = {<About />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list-property"
            element={
              <ProtectedRoute>
                <ListProperty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireRole="owner">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!hideChrome && <Footer />}
    </div>
  );
};

export default App;
