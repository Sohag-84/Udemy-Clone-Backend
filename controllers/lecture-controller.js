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

export const updateLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const {
      title,
      videoUrl,
      videoPublicId,
      isPreview,
      duration,
      resources,
      videoOrder,
    } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // Update only provided fields
    if (title !== undefined) lecture.title = title;
    if (videoUrl !== undefined) lecture.videoUrl = videoUrl;
    if (videoPublicId !== undefined) lecture.videoPublicId = videoPublicId;
    if (isPreview !== undefined) lecture.isPreview = isPreview;
    if (duration !== undefined) lecture.duration = duration;
    if (resources !== undefined) lecture.resources = resources;
    if (videoOrder !== undefined) lecture.videoOrder = videoOrder;

    await lecture.save();

    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      data: lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lecture",
    });
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // 1: Remove lecture reference from section
    await Section.findByIdAndUpdate(lecture.section, {
      $pull: { lectures: lectureId },
    });

    // 2: Delete lecture
    await Lecture.findByIdAndDelete(lectureId);

    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete lecture",
    });
  }
};
