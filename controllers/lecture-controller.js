import { Lecture } from "../models/lecture-model.js";
import { Section } from "../models/section-model.js";

export const createLecture = async (req, res) => {
  try {
    const { title, isPreview } = req.body;
    const { sectionId } = req.params;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Lecture title is required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Create lecture
    const lecture = await Lecture.create({
      title,
      isPreview,
      section: sectionId,
      order: section.lectures.length + 1,
    });

    // Push lecture into section
    section.lectures.push(lecture._id);
    await section.save();

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      data: lecture,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
};

export const getAllLecture = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId).populate("lectures");

    if (!section) {
      return res.status(404).json({
        status: false,
        message: "Section not found!",
      });
    }
    return res.json({
      status: true,
      message: "Lecture fetched successfully",
      data: section,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lecture",
    });
  }
};
