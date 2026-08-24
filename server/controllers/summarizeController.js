import { generateSummary } from '../services/geminiService.js';

const VALID_LENGTHS = new Set(['short', 'medium', 'long']);

export const handleSummarize = async (req, res, next) => {
  const { text, length = 'medium' } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({
      error: 'No text was provided to summarize.',
      code: 'MISSING_TEXT',
    });
  }

  if (!VALID_LENGTHS.has(length)) {
    return res.status(400).json({
      error: 'Summary length must be one of: short, medium, long.',
      code: 'INVALID_LENGTH',
    });
  }

  try {
    const result = await generateSummary(text, length);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
