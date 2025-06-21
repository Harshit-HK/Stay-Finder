import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import { ToastContainer } from "react-toastify";
import ListingDetail from "./pages/ListingDetail";


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
