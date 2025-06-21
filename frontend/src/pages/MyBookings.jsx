import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { backendUrl, token, listings } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [lists, setLists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/listings`);
        setLists(res.data.listings || []);
      } catch (err) {
        console.error("Backend listings fetch failed", err);
      }
    };

    fetchListings();
  }, [backendUrl]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/bookings`, {
        headers: { token: token },
      });
      setBookings(res.data.user.bookings || []);
    } catch (error) {
      console.error("Booking fetch error", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!token) {
    return <p className="p-4">Please log in to see your bookings.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, i) => {
            const matchedListing =
              listings.find((list) => list._id === booking.listing) ||
              lists.find((l) => l._id === booking.listing);

            return (
              <div
                key={i}
                onClick={() => navigate(`/listing/${booking.listing}`)}
                className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]"
              >
                <img
                  src={matchedListing?.imageUrls?.[0]}
                  alt={matchedListing?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">
                    {matchedListing?.title }
                  </h3>
                  <p>
                    <span className="font-medium">From:</span>{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">To:</span>{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Total Days:</span>{" "}
                    {booking.totalDays}
                  </p>

                  <p>
                    <span className="font-medium">Total Price:</span> ₹
                    {booking.totalPrice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
