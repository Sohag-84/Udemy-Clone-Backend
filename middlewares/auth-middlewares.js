import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(`Authorization Header: ${authHeader}`);

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please provide a valid token.",
    });
  }

  //decode this token
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token Info: ", decodedTokenInfo);

    req.userInfo = decodedTokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. Please provide a valid token.",
    });
  }
};

export default authMiddleware;
