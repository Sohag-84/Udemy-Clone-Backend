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

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json({
      status: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to load course",
    });
  }
};

// get course by id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate("creator", "name email");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get course",
    });
  }
};

// update course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (
      req.userInfo.role !== "admin" &&
      course.instructor.toString() !== req.userInfo.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this course",
      });
    }

    const updateCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

// delete course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (
      req.userInfo.role !== "admin" &&
      course.instructor.toString() !== req.userInfo.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this course",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};
