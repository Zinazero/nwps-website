import multer, { FileFilterCallback } from 'multer';

// Memory storage — handle saving manually
const storage = multer.memoryStorage();

// Multer instance
export const upload = multer({
  storage,
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
