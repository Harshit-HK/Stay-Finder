
import express from "express";
import { getAllListings , getListingById } from "../controllers/listingController.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);

export default listingRouter;