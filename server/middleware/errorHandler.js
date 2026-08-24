import multer from 'multer';

/**
 * Normalizes any error thrown in the request lifecycle into a consistent,
 * user-friendly JSON response.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error('[error]', err.message);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: 'File too large. Please upload a file smaller than 10MB.',
        code: 'FILE_TOO_LARGE',
      });
    }
    return res.status(400).json({
      error: 'There was a problem uploading your file. Please try again.',
      code: err.code,
    });
  }

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500
      ? 'Something went wrong on our end. Please try again in a moment.'
      : err.message;

  res.status(statusCode).json({
    error: message,
    code: err.code || 'INTERNAL_ERROR',
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'The requested endpoint does not exist.',
    code: 'NOT_FOUND',
  });
};
