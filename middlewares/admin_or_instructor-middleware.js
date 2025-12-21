const adminOrInstructorMiddleware = (req, res, next) => {
  try {
    const role = req.userInfo.role;
    console.log(`Your role is : ${role}`);

    if (role !== "admin" && role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Admin or Instructor rights required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

export default adminOrInstructorMiddleware;
