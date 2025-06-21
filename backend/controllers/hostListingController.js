import Listings from "../models/listings.js";
import cloudinary from "../config/cloudinary.js";

// Create Listing
export const createListing = async (req, res) => {
  try {
    const hostId = req.hostId;
    const { title, description, location, price, lat, lng, address } = req.body;

    const files = req.files || [];
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newListing = await Listings.create({
      title,
      description,
      location,
      price,
      imageUrls: uploadedUrls,
      host: hostId,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      address,
    });

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing: newListing,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Read All Listings for Host
export const getHostListings = async (req, res) => {
  try {
    const hostId = req.hostId;
    const listings = await Listings.find({ host: hostId });

    res.status(200).json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Listing with image handling
export const updateListing = async (req, res) => {
  try {
    const hostId = req.hostId;
    const listingId = req.params.listingId;

    // Parse existing images (from frontend)
    const existingImages = JSON.parse(req.body.existingImages || "[]");

    // upload new images on cloudinary (if any)
    const newUploadedImages = [];

    if (req.files?.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "stayfinder_listings",
        });
        newUploadedImages.push(result.secure_url);
      }
    }

    // Merge existing and new images
    const updatedImageUrls = [...existingImages, ...newUploadedImages];

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      imageUrls: updatedImageUrls,
      lat: parseFloat(req.body.lat),
      lng: parseFloat(req.body.lng),
      address: req.body.address,
    };

    const listing = await Listings.findOneAndUpdate(
      { _id: listingId, host: hostId },
      updatedData,
      { new: true }
    );

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Listing updated", listing });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Listing
export const deleteListing = async (req, res) => {
  try {
    const hostId = req.hostId;
    const listingId = req.params.id;

    const deleted = await Listings.findOneAndDelete({
      _id: listingId,
      host: hostId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({ success: true, message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
