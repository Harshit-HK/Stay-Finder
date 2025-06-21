import userModel from "../models/User.js";

// get Bookings of user
export const getUserWithBookings = async (req, res) => {
  try {
    const userId  = req.userId;


    const userWithBookings = await userModel
      .findById(userId)
      .populate("bookings");

    if (!userWithBookings) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: userWithBookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

