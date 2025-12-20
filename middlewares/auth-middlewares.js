import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "User is not authenticated!",
      });
    }

    const decodeInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodeInfo) {
      return res.status(401).json({
        status: false,
        message: "Invalid token",
      });
    }
    req.userInfo = decodeInfo;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Access denied. Please provide a valid token.",
    });
  }
};

export default authMiddleware;
