import fs from 'fs/promises';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { createWorker } from 'tesseract.js';

/**
 * Extracts raw text from a PDF file buffer.
 */
export const extractFromPdf = async (filePath) => {
  const dataBuffer = await fs.readFile(filePath);

  let result;
  try {
    result = await pdfParse(dataBuffer);
  } catch (err) {
    const error = new Error(
      'We could not read this PDF. It may be corrupted or password-protected.'
    );
    error.statusCode = 422;
    error.code = 'PDF_PARSE_FAILED';
    throw error;
  }

  const text = (result.text || '').trim();

  if (!text) {
    const error = new Error(
      'This PDF has no extractable text. If it is a scanned document, try uploading it as an image instead.'
    );
    error.statusCode = 422;
    error.code = 'EMPTY_PDF_TEXT';
    throw error;
  }

  return text;
};

/**
 * Extracts text from an image using Tesseract.js OCR.
 */
export const extractFromImage = async (filePath) => {
  let worker;
  try {
    worker = await createWorker('eng');
    const {
      data: { text },
    } = await worker.recognize(filePath);
    const cleaned = (text || '').trim();

    if (!cleaned) {
      const error = new Error(
        'We could not detect any readable text in this image. Try a clearer photo or scan.'
      );
      error.statusCode = 422;
      error.code = 'EMPTY_OCR_TEXT';
      throw error;
    }

    return cleaned;
  } catch (err) {
    if (err.code) throw err;
    const error = new Error(
      'Text recognition failed for this image. Please try a different file.'
    );
    error.statusCode = 422;
    error.code = 'OCR_FAILED';
    throw error;
  } finally {
    if (worker) await worker.terminate();
  }
};

/**
 * Routes a file to the correct extraction strategy based on its mimetype.
 */
export const extractText = async (filePath, mimetype) => {
  if (mimetype === 'application/pdf') {
    return extractFromPdf(filePath);
  }
  if (['image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
    return extractFromImage(filePath);
  }

  const error = new Error('Unsupported file type.');
  error.statusCode = 400;
  error.code = 'UNSUPPORTED_FILE_TYPE';
  throw error;
};
