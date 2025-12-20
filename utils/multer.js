import multer from "multer";

// const upload = multer({ dest: "uploads/" });

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 500 * 1024 * 1024 }, // max 500MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/bmp",
      "image/svg+xml",
      "video/mp4",
      "video/quicktime",
      "video/mkv",
      "video/webm",
      "video/avi",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image or video files are allowed"), false);
    }
  },
});

export default upload;
