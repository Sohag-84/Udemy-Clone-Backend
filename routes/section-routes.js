import express from "express";
import { createSection } from "../controllers/section-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import adminOrInstructorMiddleware from "../middlewares/admin_or_instructor-middleware.js";

const router = express.Router();

router
  .route("/:courseId/create")
  .post(authMiddleware, adminOrInstructorMiddleware, createSection);

export default router;
