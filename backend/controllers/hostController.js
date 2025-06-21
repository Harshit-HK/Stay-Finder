import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import hostModel from "../models/hostModel.js";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register Host
export const registerHost = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // checking Host already exist or not
    const existingHost = await hostModel.findOne({ email });
    if (existingHost) {
      return res.json({ success: false, message: "Host already exists" });
    }

    // Validating email formate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //  strong Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing Host's Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newHost = new hostModel({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    const host = await newHost.save();
    const token = createToken(host._id);

    res.json({
      success: true,
      message: "Host registered",
      host: {
        name: host.name,
        email: host.email,
        phone: host.phone,
      },
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Login Host
export const loginHost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const host = await hostModel.findOne({ email });
    if (!host) {
      return res.json({ success: false, message: "Host doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, host.password);
    if (!isMatch) {

      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(host._id);
    res.json({
      success: true,
      message: "Host login successful",
      host: {
        name: host.name,
        email: host.email,
        phone: host.phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verification Host

export const verifyHost = async (req, res) => {
  try {
    const host = await hostModel.findById(req.hostId).select("-password");
    if (!host)
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login Again" });

    res.json({
      success: true,
      host,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Token verification failed" });
  }
};
