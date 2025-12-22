import multer from "multer";

const fileErrorHandler = (err, req, res, next) => {
  // multer specific errors
  if (err instanceof multer.MulterError) {
    // File size error handle
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large. Max 500MB allowed.",
      });
    }

    // Other multer errors
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // fileFilter custom errors
  if (err.message === "Only image or video files are allowed") {
    return res.status(400).json({
      success: false,
      message: "Invalid file type. Please upload image or video only.",
    });
  }

  // default error
  return res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

export default fileErrorHandler;
