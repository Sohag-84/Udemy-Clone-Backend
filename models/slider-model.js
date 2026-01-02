import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Slider = mongoose.model("Slider", sliderSchema);
