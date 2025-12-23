import fs from "fs";

import { Course } from "../models/course-model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const getInstructorAllCourses = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const courses = await Course.find({ creator: userId });
    res.json({
      status: true,
      message: "Course fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get admin courses",
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find().populate({
      path: "sections",
      populate: {
        path: "lectures",
      },
    });
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

    let updatedData = { ...req.body };

    //if already have thumbnail, then first delete then update
    if (req.file) {
      //delete old thumbnail from cloudinary
      if (course.courseThumbnailPublicId) {
        await deleteMediaFromCloudinary(course.courseThumbnailPublicId);
      }

      //upload new thumbnail
      const uploadResult = await uploadMedia(req.file.path);

      updatedData.courseThumbnail = uploadResult.secure_url;
      updatedData.courseThumbnailPublicId = uploadResult.public_id;

      fs.unlinkSync(req.file.path);
    }

    const updateCourse = await Course.findByIdAndUpdate(id, updatedData, {
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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

export const toggolePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found.",
      });
    }

    //publish status based on the query parameter
    course.isPublished = publish === "true";
    await course.save();
    const statusMessage = course.isPublished
      ? "Course is published"
      : "Course is unpublished";

    return res.status(200).json({
      status: false,
      message: statusMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch published courses
    const courses = await Course.find({ isPublished: true })
      .populate("creator", "name email photoUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count total published courses
    const totalCourses = await Course.countDocuments({
      isPublished: true,
    });

    res.status(200).json({
      success: true,
      totalCourses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit),
      data: courses,
    });
  } catch (error) {
    console.error("Get Published Courses Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch published courses",
      error: error.message,
    });
  }
};

export const getPublishedCoursesdf = async (req, res) => {
  try {
    const course = await Course.find({});
    return res.json({
      status: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      mesage: "Failed to get published course",
    });
  }
};
