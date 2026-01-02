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

    fs.unlinkSync(imageUrl.path);

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
    return res.json({
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

export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
      return res.status(400).json({
        status: false,
        message: "Slider not found!",
      });
    }

    //delete image from cloudinary
    if (slider.publicId) {
      await deleteMediaFromCloudinary(slider.publicId);
    }

    //now delete slider from mongoDB
    await Slider.findByIdAndDelete(id);

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
