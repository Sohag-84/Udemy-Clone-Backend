import { Course } from "../models/course-model.js";

export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    } = req.body;

    // Basic validation
    if (!courseTitle || !category || !coursePrice) {
      return res.status(400).json({
        success: false,
        message: "Course title, category, and price are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
      creator: req.userInfo.userId, // coming from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      mesage: "Failed to create course",
    });
  }
};
