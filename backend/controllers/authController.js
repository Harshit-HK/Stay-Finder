import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user register
export const register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // checking user already exist or not
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating email formate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // strong Password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user's Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Registration successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Route for user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.json({ success: false, message: "Invalid Credentials" });
    } else {
      const token = createToken(user._id);
      res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Verifying user
export const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized, Login Again" });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Token verification failed" });
  }
};
