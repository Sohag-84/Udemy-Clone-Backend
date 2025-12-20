import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );

  const userResponse = user.toObject();
  delete userResponse.password;

  return res.status(200).json({
    status: true,
    message,
    token,
    user: userResponse,
  });
};
