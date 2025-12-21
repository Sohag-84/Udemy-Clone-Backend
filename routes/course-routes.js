import express from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import { createCourse } from "../controllers/course-controller.js";

const router = express.Router();

router.route("/create").post(authMiddleware, createCourse);

export default router;
