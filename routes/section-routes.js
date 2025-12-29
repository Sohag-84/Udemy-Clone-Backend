import express from "express";
import {
  createSection,
  deleteSection,
  editSection,
  getAllSections,
} from "../controllers/section-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import adminOrInstructorMiddleware from "../middlewares/admin_or_instructor-middleware.js";

const router = express.Router();

router
  .route("/:courseId/create")
  .post(authMiddleware, adminOrInstructorMiddleware, createSection);

router
  .route("/:sectionId/delete")
  .post(authMiddleware, adminOrInstructorMiddleware, deleteSection);

router
  .route("/:sectionId/edit")
  .post(authMiddleware, adminOrInstructorMiddleware, editSection);

router.route("/:courseId/get").get(authMiddleware, getAllSections);

export default router;
