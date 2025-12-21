import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { createCourse } from "../controllers/course-controller.js";
import instructorMiddleware from "../middlewares/instructor-middleware.js";

const router = express.Router();

router
  .route("/create")
  .post(authMiddleware, instructorMiddleware, createCourse);

export default router;
