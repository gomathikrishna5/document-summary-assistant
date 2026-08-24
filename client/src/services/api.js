import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

const extractErrorMessage = (error, fallback) => {
  if (error.code === 'ECONNABORTED') {
    return 'The request took too long to respond. Please check your connection and try again.';
  }
  if (!error.response) {
    return 'Unable to reach the server. Please check your network connection.';
  }
  return error.response.data?.error || fallback;
};

/**
 * Uploads a file and returns extracted text plus file metadata.
 */
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await client.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Something went wrong while uploading your file.'));
  }
};

/**
 * Sends extracted text to the backend for AI summarization.
 */
export const summarizeText = async (text, length) => {
  try {
    const { data } = await client.post('/api/summarize', { text, length });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Something went wrong while generating your summary.'));
  }
};
