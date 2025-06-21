import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrls: [{ type: String }],
    host: { type: mongoose.Schema.Types.ObjectId, ref: "host" },
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
  },
  { timestamps: true }
);

const Listings =
  mongoose.model.Listings || mongoose.model("Listing", listingSchema);
export default Listings;
