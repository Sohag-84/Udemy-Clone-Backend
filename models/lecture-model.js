import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      default: "",
    },
    videoPublicId: {
      type: String,
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number, // in seconds or minutes
    },
    resources: [
      {
        type: String, // URLs or filenames of additional resources (PDFs, docs)
      },
    ],
    videoOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
