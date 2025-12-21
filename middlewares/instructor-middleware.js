const instructorMiddleware = async (req, res, next) => {
  try {
    if (req.userInfo.role != "instructor") {
      return res.status(401).json({
        success: false,
        message: "Access denied! Instructor rights required",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. Please provide a valid token.",
    });
  }
};

export default instructorMiddleware;
