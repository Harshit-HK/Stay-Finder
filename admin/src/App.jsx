import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import HostLogin from "./pages/HostLogin";
import AddListing from "./pages/AddListing";
import MyListings from "./pages/MyListings";
import HostProfile from "./pages/HostProfile";
import HostNavbar from "./components/HostNavbar";
import HostListingDetail from "./pages/HostListingDetail";
import HostBookings from "./pages/HostBookings";
import BookingDetail from "./pages/BookingDetail";

function App() {
  return (
    <>
      <ToastContainer />

      <HostNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<HostLogin />} />
        <Route path="/profile" element={<HostProfile />} />
        <Route path="/listings" element={<MyListings />} />
        <Route path="/bookings" element={<HostBookings />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
        <Route path="/edit-listing/:listingId" element={<AddListing />} />
        <Route path="/listings/:id" element={<HostListingDetail />} />
      </Routes>
    </>
  );
}

export default App;
