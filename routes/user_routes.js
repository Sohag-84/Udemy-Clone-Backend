import express from "express";
import {
  getAllUser,
  getUserProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user-list").get(getAllUser);
router.route("/logout").get(logout);
router.route("/profile").get(authMiddleware, getUserProfile);
router.post(
  "/profile/update",
  authMiddleware,
  upload.single("profilePhoto"),
  updateProfile
);

export default router;
