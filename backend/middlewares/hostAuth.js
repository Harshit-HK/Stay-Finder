import jwt from "jsonwebtoken";

export const hostAuthMiddleware = async (req, res, next) => {
  const token = req.headers.token
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.hostId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
