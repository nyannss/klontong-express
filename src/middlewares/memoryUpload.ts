import {
  NextFunction,
  Request,
  Response,
} from 'express';
import multer, {
  FileFilterCallback,
  MulterError,
} from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const limits = 2e6;

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const pattern = /jpg|png|webp|jpeg/i;
  const ext = path.extname(file.originalname);
  if (!pattern.test(ext)) {
    return callback(new Error("Only JPG, PNG, and WebP files are allowed"));
  }
  callback(null, true);
};

const uploader = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({
    storage,
    limits: {
      fileSize: limits,
    },
    fileFilter,
  }).single("image");

  upload(req, res, function (err) {
    if (err instanceof MulterError) {
      if (err.code && err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(422)
          .json({ status: 422, msg: "Image must be below 2mb" });
      }
      return res.status(422).json({ status: 422, msg: "Invalid format type" });
    } else if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, msg: err.message });
    }
    return next();
  });
};

export default uploader;
