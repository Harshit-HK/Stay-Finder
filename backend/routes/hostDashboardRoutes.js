import express from "express";
import upload from "../middlewares/multer.js";
import { hostAuthMiddleware } from "../middlewares/hostAuth.js";
import { getHostBookings } from "../controllers/hostBookingController.js";

import {
  createListing,
  getHostListings,
  updateListing,
  deleteListing,
} from "../controllers/hostListingController.js";

const router = express.Router();

router.post("/add", hostAuthMiddleware, upload.array("images", 5), createListing);
router.get("/listings", hostAuthMiddleware, getHostListings);
router.put("/update/:listingId", hostAuthMiddleware,upload.array("images", 5), updateListing);
router.delete("/delete/:id", hostAuthMiddleware, deleteListing);

router.get("/bookings", hostAuthMiddleware, getHostBookings)

export default router;
