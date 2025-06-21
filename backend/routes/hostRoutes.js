import express from "express";
import {
  registerHost,
  loginHost,
  verifyHost,
} from "../controllers/hostController.js";
import { hostAuthMiddleware } from "../middlewares/hostAuth.js";

const hostAuthRoute = express.Router();

hostAuthRoute.post("/register", registerHost);
hostAuthRoute.post("/login", loginHost);
hostAuthRoute.get("/verify", hostAuthMiddleware, verifyHost);

export default hostAuthRoute;
