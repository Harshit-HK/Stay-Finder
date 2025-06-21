import express from "express";

import { login, register, verifyUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify", authMiddleware, verifyUser);

export default authRouter;
