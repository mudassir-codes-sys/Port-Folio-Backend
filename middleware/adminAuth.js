import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminAuth;
