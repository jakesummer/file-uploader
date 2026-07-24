import multer from "multer";
import multerS3 from "multer-s3";
import client from "./s3Client.js";

const upload = multer({
  storage: multerS3({
    s3: client,
    bucket: "uploads",
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default upload;
