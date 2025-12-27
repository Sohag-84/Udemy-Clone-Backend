import Stripe from "stripe";
import { Course } from "../models/course-model.js";
import { CoursePurchase } from "../models/course-purchase-model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { courseId } = req.body;

    // 1️⃣ Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2️⃣ Already purchased check
    const alreadyPurchased = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    // 3️⃣ Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.coursePrice * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId.toString(),
        courseId: courseId.toString(),
      },
    });

    // 4️⃣ Create pending purchase
    await CoursePurchase.create({
      userId,
      courseId,
      amount: course.coursePrice,
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    // 5️⃣ Return client secret
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Create PaymentIntent Error:", error);
    res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};
