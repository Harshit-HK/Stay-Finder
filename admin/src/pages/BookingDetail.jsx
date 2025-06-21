import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HostContext } from "../context/HostContext";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const BookingDetail = () => {
  const { bookings } = useContext(HostContext);
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const found = bookings.find((b) => b._id === id);
    if (found) setBooking(found);
  }, [id, bookings]);

  if (!booking) {
    return (
      <div className="p-6 text-center text-red-500">Booking not found</div>
    );
  }

  const {
    listing: { imageUrls, title, location },
    totalPrice,
    totalDays,
    startDate,
    endDate,
    user,
  } = booking;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-100 p-4">
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Booking Details</h2>

        {/* Top Image */}
        <div className="w-full h-72 overflow-hidden rounded-xl shadow">
          <img
            src={imageUrls[0]}
            alt="Main Property"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {imageUrls.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Image ${i + 1}`}
              className="h-40 w-full object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Detail Section */}
        <div className="bg-white shadow rounded-xl mt-6 p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Property Info
              </h3>
              <p>
                <span className="font-semibold text-gray-600">Title:</span>{" "}
                {title}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Location:</span>{" "}
                {location}
              </p>
              <p>
                <span className="font-semibold text-gray-600">
                  Stay Duration:
                </span>{" "}
                {totalDays} {totalDays === 1 ? "Day" : "Days"}
              </p>
              <p>
                <span className="font-semibold text-gray-600 ">
                  Total Price:
                </span>{" "}
                ₹{totalPrice}
              </p>
              <p>
                <span className="font-semibold text-gray-600">From:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-600">To:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Customer Info
              </h3>
              <p className="flex items-center gap-2">
                <FaUser size={12} className="text-blue-500" />
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                {user.name}
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope size={12} className="text-blue-500" />
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                {user.email}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone size={12} className="text-blue-500" />
                <span className="font-semibold text-gray-600">Phone:</span>{" "}
                {user.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;


