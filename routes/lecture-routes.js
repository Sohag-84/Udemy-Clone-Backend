import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import adminOrInstructorMiddleware from "../middlewares/admin_or_instructor-middleware.js";
import {
  createLecture,
  getAllLecture,
} from "../controllers/lecture-controller.js";

const router = express.Router();

router
  .route("/:sectionId/create")
  .post(authMiddleware, adminOrInstructorMiddleware, createLecture);
router.route("/:sectionId").get(getAllLecture);

export default router;
