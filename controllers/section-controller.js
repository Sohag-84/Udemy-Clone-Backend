import { Course } from "../models/course-model.js";
import { Lecture } from "../models/lecture-model.js";
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

export const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // 1: Remove section from course
    await Course.findByIdAndUpdate(section.course, {
      $pull: { sections: sectionId },
    });

    // 2: Delete all lectures of this section
    await Lecture.deleteMany({ section: sectionId });

    // 3: Delete the section
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete section",
    });
  }
};

export const editSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Section title is required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    section.title = title;
    await section.save();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update section",
    });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .select("sections")
      .populate({
        path: "sections",
        options: { sort: { order: 1 } },
        populate: {
          path: "lectures",
          options: { sort: { videoOrder: 1 } },
        },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section fetched successfully",
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get section list",
    });
  }
};
