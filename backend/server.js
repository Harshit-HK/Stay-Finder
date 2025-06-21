import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import userRouter from "./routes/userRoutes.js";
import hostAuthRoute from "./routes/hostRoutes.js";
import hostDashboardRoute from "./routes/hostDashboardRoutes.js";

// configuration
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());

// api endpoints User
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/bookings", userRouter)

// api endpoints Host
app.use("/api/hosts", hostAuthRoute);
app.use("/api/host", hostDashboardRoute);


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

