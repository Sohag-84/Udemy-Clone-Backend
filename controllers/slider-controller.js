import fs from "fs";

import { Slider } from "../models/slider-model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createSlider = async (req, res) => {
  try {
    const { title, isActive } = req.body;
    const imageUrl = req.file;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResult = await uploadMedia(imageUrl.path);

    const slider = await Slider.create({
      title,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      isActive,
    });

    res.status(201).json({
      status: true,
      message: "Slider created successfully",
      data: slider,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to create slider",
    });
  }
};

export const getSlider = async (req, res) => {
  try {
    const slider = await Slider.find({ isActive: true });
    res.json({
      status: true,
      message: "Slider fetched successfully",
      data: slider,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetched slider",
    });
  }
};
