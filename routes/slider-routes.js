import express from "express";

import { createSlider } from "../controllers/slider-controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(upload.single("imageUrl"), createSlider);

export default router;
