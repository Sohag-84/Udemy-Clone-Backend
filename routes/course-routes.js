import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getInstructorAllCourses,
  getCourseById,
  updateCourse,
  toggolePublishCourse,
  getPublishedCoursesdf,
  getPublishedCourses,
} from "../controllers/course-controller.js";
import adminOrInstructorMiddleware from "../middlewares/admin_or_instructor-middleware.js";
import upload from "../utils/multer.js";

const router = express.Router();

router
  .route("/create")
  .post(authMiddleware, adminOrInstructorMiddleware, createCourse);

router.route("/all-course").get(getAllCourse);
router
  .route("/instructor-courses")
  .get(authMiddleware, getInstructorAllCourses);
router.route("/:id").get(getCourseById);
router
  .route("/update/:id")
  .post(
    authMiddleware,
    adminOrInstructorMiddleware,
    upload.single("courseThumbnail"),
    updateCourse
  );
router
  .route("/delete/:id")
  .get(authMiddleware, adminOrInstructorMiddleware, deleteCourse);

router
  .route("/:courseId")
  .post(authMiddleware, adminOrInstructorMiddleware, toggolePublishCourse);

router
.route("/publish-course/get").get(getPublishedCourses);

export default router;
