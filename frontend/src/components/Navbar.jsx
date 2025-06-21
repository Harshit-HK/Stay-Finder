import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { isAuthenticated, searchQuery, setSearchQuery } =
    useContext(AppContext);

  return (
    <nav className="bg-white rounded-xl shadow-md p-4 flex flex-wrap items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">
        StayFinder
      </Link>

      {isHome && (
        <input
          type="text"
          placeholder="Search by location or price..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border bg-slate-100 px-3 py-1 rounded-md w-full max-w-sm focus:outline-none"
        />
      )}

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition"
        >
          Home
        </Link>
        <Link
          to="/my-bookings"
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition"
        >
          My Bookings
        </Link>

        {!isAuthenticated ? (
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        ) : (
          <Link
            to="/profile"
            className="text-2xl text-blue-600 hover:text-blue-800"
          >
            <FaUserCircle />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
