import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      index: true,
    },

    paymentIntentId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * 🔐 Prevent duplicate completed purchases
 */
coursePurchaseSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true, partialFilterExpression: { status: "completed" } }
);

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseSchema
);
