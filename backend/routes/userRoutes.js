import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getUserWithBookings } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/",authMiddleware, getUserWithBookings);

export default userRouter;