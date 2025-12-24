import jwt from "jsonwebtoken";
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  try {
    console.log('api hit');
    
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res
        .status(200)
        .json({ success: true, message: "Login Successful", token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default adminLogin;
