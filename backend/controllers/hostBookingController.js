import Booking from "../models/Booking.js";
import Listings from "../models/listings.js";

export const getHostBookings = async (req, res) => {
  try {
    const hostId = req.hostId;
    const hostListings = await Listings.find({ host: hostId });
    const listingIds = hostListings.map((listing) => listing._id);
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("user", "name email phone")
      .populate("listing", "title price _id location imageUrls"); 

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

