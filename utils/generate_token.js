import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign(
    {
      user: user._id,
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

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    })
    .json({
      status: true,
      message,
      token,
      user: userResponse,
    });
};
