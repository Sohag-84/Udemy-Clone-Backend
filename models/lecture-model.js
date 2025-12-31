import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
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
      type: String, // format "HH:MM" or in seconds as string
      default: "00:00",
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
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
