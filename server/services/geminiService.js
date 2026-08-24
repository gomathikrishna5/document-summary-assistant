import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'gemini-3.6-flash';

const LENGTH_INSTRUCTIONS = {
  short: 'The "summary" field should be 3-5 concise bullet-style sentences joined into a short paragraph.',
  medium: 'The "summary" field should be 1-2 well-developed paragraphs.',
  long: 'The "summary" field should be a detailed, thorough explanation covering multiple paragraphs.',
};

const buildPrompt = (text, length) => {
  const lengthInstruction = LENGTH_INSTRUCTIONS[length] || LENGTH_INSTRUCTIONS.medium;

  return `You are an expert document analyst. Analyze the document text below and respond with ONLY a valid JSON object (no markdown fences, no preamble, no explanation) matching exactly this shape:

{
  "summary": "string",
  "keyPoints": ["string", "string"],
  "mainIdeas": ["string", "string"],
  "suggestions": ["string", "string"]
}

Rules:
- ${lengthInstruction}
- "keyPoints" should be 4-6 short bullet points capturing the most important facts.
- "mainIdeas" should be 2-4 high-level themes or arguments in the document.
- "suggestions" should be 3-5 concrete, constructive suggestions for improving the document's clarity, structure, or completeness.
- Do not wrap the JSON in markdown code fences.
- Do not include any text outside the JSON object.

Document text:
"""
${text.slice(0, 30000)}
"""`;
};

const stripCodeFences = (raw) => {
  return raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
};

/**
 * Sends extracted document text to Gemini and returns a structured summary.
 */
export const generateSummary = async (text, length = 'medium') => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const error = new Error(
      'The AI service is not configured. Please set GEMINI_API_KEY on the server.'
    );
    error.statusCode = 500;
    error.code = 'MISSING_API_KEY';
    throw error;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  let response;
  try {
    const result = await model.generateContent(buildPrompt(text, length));
    response = result.response.text();
  } catch (err) {
    console.error('[gemini]', err.message);
    const error = new Error(
      'The AI summary service is temporarily unavailable. Please try again shortly.'
    );
    error.statusCode = 502;
    error.code = 'GEMINI_REQUEST_FAILED';
    throw error;
  }

  const cleaned = stripCodeFences(response);

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    const error = new Error(
      'The AI returned an unexpected response format. Please try again.'
    );
    error.statusCode = 502;
    error.code = 'GEMINI_PARSE_FAILED';
    throw error;
  }

  return {
    summary: parsed.summary || '',
    keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
    mainIdeas: Array.isArray(parsed.mainIdeas) ? parsed.mainIdeas : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
  };
};
