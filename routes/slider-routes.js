import express from "express";

import {
  createSlider,
  deleteSlider,
  getSlider,
  upldateSlider,
} from "../controllers/slider-controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(upload.single("imageUrl"), createSlider);
router.route("/sliders").get(getSlider);
router.route("/delete/:id").post(deleteSlider);
router
  .route("/update/:sliderId")
  .post(upload.single("imageUrl"), upldateSlider);

export default router;
