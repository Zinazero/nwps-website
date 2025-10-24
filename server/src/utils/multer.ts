import fs from 'node:fs/promises';
import path from 'node:path';
import multer, { FileFilterCallback } from 'multer';

// Memory storage — handle saving manually
const storage = multer.memoryStorage();

// Multer instance
export const upload = multer({
  storage,
  fileFilter: (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const renameFilesInFolder = async (folder: string, oldSlug: string, newSlug: string) => {
  try {
    const files = await fs.readdir(folder);

    for (const file of files) {
      const ext = path.extname(file);
      const match = file.match(new RegExp(`^${oldSlug}-(\\d+)${ext}$`));

      if (match) {
        const index = match[1];
        const newFileName = `${newSlug}-${index}${ext}`;
        await fs.rename(path.join(folder, file), path.join(folder, newFileName));
      }
    }
  } catch (err) {
    console.error(`Failed to rename files in folder ${folder}:`, err);
    throw err;
  }
};

export const ensureFolder = async (folderPath: string) => {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (err) {
    console.error(`Failed to create folder ${folderPath}:`, err);
    throw err;
  }
};

export const writeFiles = async (folder: string, files: Express.Multer.File[], slug: string) => {
  for (const file of files) {
    const index = Number(file.fieldname);
    const ext = '.jpg'; // Enforcing .jpg for now
    const filePath = path.join(folder, `${slug}-${index + 1}${ext}`);

    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (err) {
      console.error(`Failed to write file ${filePath}:`, err);
    }
  }
};
