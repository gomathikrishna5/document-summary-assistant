import fs from 'fs/promises';
import { extractText } from '../services/extractText.js';

export const handleUpload = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: 'No file was uploaded. Please choose a PDF, PNG, or JPG file.',
      code: 'NO_FILE',
    });
  }

  if (file.size === 0) {
    await fs.unlink(file.path).catch(() => {});
    return res.status(400).json({
      error: 'This file is empty. Please upload a file that contains content.',
      code: 'EMPTY_FILE',
    });
  }

  try {
    const text = await extractText(file.path, file.mimetype);

    res.status(200).json({
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
      extractedText: text,
      characterCount: text.length,
    });
  } catch (err) {
    next(err);
  } finally {
    await fs.unlink(file.path).catch(() => {});
  }
};
