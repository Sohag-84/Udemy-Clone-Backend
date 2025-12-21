import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
} from "../controllers/course-controller.js";
import adminOrInstructorMiddleware from "../middlewares/admin_or_instructor-middleware.js";

const router = express.Router();

router
  .route("/create")
  .post(authMiddleware, adminOrInstructorMiddleware, createCourse);

router.route("/all-course").get(getAllCourse);
router.route("/:id").get(getCourseById);
router
  .route("/update/:id")
  .post(authMiddleware, adminOrInstructorMiddleware, updateCourse);
router
  .route("/delete/:id")
  .get(authMiddleware, adminOrInstructorMiddleware, deleteCourse);

export default router;
