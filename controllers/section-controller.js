import { Course } from "../models/course-model.js";
import { Section } from "../models/section-model.js";

export const createSection = async (req, res) => {
  try {
    const { title } = req.body;
    const { courseId } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Section title is required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: "Course not found.",
      });
    }
    //create section
    const section = await Section.create({
      title,
      course: courseId,
      order: course.sections.length + 1,
    });

    //push section into course
    course.sections.push(section._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create section",
    });
  }
};
