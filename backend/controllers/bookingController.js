import Booking from "../models/Booking.js";
import Stripe from "stripe";
import userModel from "../models/User.js";

// Create Stripe Payment Session
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (req, res) => {
  try {
    const { listingId, title, price, totalDays, startDate, endDate } = req.body;
    const { origin } = req.headers;
    const userId = req.userId;
    const totalPrice = price * totalDays;

    // Checking if booking is already done
    const existing = await Booking.findOne({
      listing: listingId,
      user: userId,
      startDate,
      endDate,
    });

    if (existing) {
      return res.json({ success: false, message: "Booking already done for same date" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: { name: `${title} stay - ${totalDays} day(s)   Enter dummy-data - 4242 4242 4242 4242 - future date
              ` },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/verify?success=true&listingId=${listingId}&userId=${userId}&startDate=${startDate}&endDate=${endDate}&totalDays=${totalDays}&totalPrice=${totalPrice}`,

      cancel_url: `${origin}/verify?success=false`,
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: "Stripe session error" });
  }
};

// Save Booking

export const verifyBooking = async (req, res) => {
  try {
    const { success, listingId, startDate, endDate, totalDays, totalPrice } =
      req.body;
    const userId = req.userId;

    // Checking if booking is already done
    const existing = await Booking.findOne({
      listing: listingId,
      user: userId,
      startDate,
      endDate,
    });

    if (existing) {
      return res.json({ success: false, message: "Booking already done" });
    }

    if (success === "true") {
      const newBooking = new Booking({
        listing: listingId,
        user: userId,
        startDate,
        endDate,
        totalDays,
        totalPrice,
        payment: true,
      });
      await newBooking.save();

      await userModel.findByIdAndUpdate(userId, {
        $push: { bookings: newBooking._id },
      });
      return res.json({ success: true, booking: newBooking });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
