import express from "express";
import {verifyBooking, createStripeSession } from "../controllers/bookingController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const bookingRouter = express.Router()

bookingRouter.post("/stripe-session",authMiddleware, createStripeSession);
bookingRouter.post("/verify",authMiddleware, verifyBooking);

export default bookingRouter;
