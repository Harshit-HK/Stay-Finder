import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { HostContext } from "../context/HostContext";

function HostNavbar() {
  const location = useLocation();
  const { isAuthenticated } = useContext(HostContext);

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-black text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`;

  const isBookingDetailPage = location.pathname.startsWith("/bookings/");
  const isProfile = location.pathname.startsWith("/profile");
  const isLogin = location.pathname.startsWith("/login");

  if (isLogin) return null;
  return (
    <nav
      className={`${
        isBookingDetailPage || isProfile ? "w-[99%] shadow-xl" : " mt-4 w-[96%] shadow"
      } mx-auto bg-[#f3f4f6] rounded-xl p-4 transition-all duration-500`}
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          StayFinder Host
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/bookings" className={navLinkClass("/bookings")}>
            Customer's Bookings
          </Link>
          <Link to="/listings" className={navLinkClass("/listings")}>
            My Listings
          </Link>
          <Link to="/add-listing" className={navLinkClass("/add-listing")}>
            Add Property
          </Link>

          {isAuthenticated ? (
            <Link to="/profile">
              <FaUserCircle
                size={26}
                className="text-gray-700 cursor-pointer hover:text-black transition"
                title="Host Profile"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HostNavbar;
