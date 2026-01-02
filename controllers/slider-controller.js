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

    return res.status(201).json({
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
    const sl = await Slider.find({ isActive: false });
    return res.json({
      status: true,
      message: "Slider fetched successfully",
      data: slider,
      sl,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetched slider",
    });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByIdAndDelete(id);

    if (!slider) {
      return res.status(400).json({
        status: false,
        message: "Slider not found!",
      });
    }
    return res.json({
      status: true,
      message: "Slider successfully deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetched slider",
    });
  }
};
