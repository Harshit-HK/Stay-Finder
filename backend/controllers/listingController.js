import Listings from "../models/listings.js";

// Get all property listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listings.find();
    res.status(200).json({ success: true, listings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch listings" });
  }
};

// Get a specific property listing
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listings.findById(id);

    if (!listing) {
      res.status(404).json({ success: false, message: "Listing not found" });
    }
    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching listing" });
  }
};
