import express from "express";

import { createSlider, getSlider } from "../controllers/slider-controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(upload.single("imageUrl"), createSlider);
router.route("/sliders").get(getSlider);

export default router;
