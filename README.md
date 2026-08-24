# Document Summary Assistant

An AI-powered full-stack application that turns PDFs and images into clear, structured document insights — a summary, key points, main ideas, and improvement suggestions — in seconds.

Built as a technical assessment submission for the Software Engineer position at **Unthinkable Solutions**.

![Landing page screenshot placeholder](docs/screenshot-landing.png)
![Results dashboard screenshot placeholder](docs/screenshot-results.png)

## Overview

Document Summary Assistant lets a user drag and drop a PDF, PNG, or JPG, extracts its text (via `pdf-parse` for PDFs and Tesseract.js OCR for images), and sends that text to Google's Gemini API to generate a structured summary. The result is presented in a polished, dark-themed dashboard with copy/download actions, character counts, and reading-time estimates.

## Features

- **Premium dark UI** — glassmorphism cards, gradient accents, Inter typography, and Framer Motion animations throughout
- **Drag-and-drop upload** — with a browse fallback, live file metadata (name, size, type), and hover glow feedback
- **Segmented summary-length control** — Short (3–5 bullets), Medium (1–2 paragraphs), or Long (detailed)
- **Text extraction** — PDF parsing via `pdf-parse`, image OCR via `tesseract.js`
- **AI-generated insights** — summary, key points, main ideas, and improvement suggestions from Gemini
- **Results dashboard** — animated cards for each insight, plus a scrollable, copyable extracted-text panel
- **Polished loading experience** — animated step indicator (Uploading → Extracting → Summarizing) with skeleton loaders
- **Robust error handling** — friendly messages for unsupported files, empty files, OCR failures, Gemini failures, network errors, and oversized files
- **Bonus UX** — copy/download summary as TXT, character count, estimated reading time, toast notifications, and a recent-uploads list (session-scoped)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend | Node.js + Express |
| File upload | Multer |
| PDF parsing | pdf-parse |
| OCR | Tesseract.js |
| AI | Google Gemini API (`gemini-1.5-flash`, free tier) |
| Frontend hosting | Vercel |
| Backend hosting | Render |

## Project Structure

```
document-summary-assistant/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, Hero, UploadCard, SummaryOptions, LoadingState, ResultCards, ExtractedTextPanel, Footer, ToastContainer
│   │   ├── pages/            # Home
│   │   ├── services/         # api.js (axios client), format.js
│   │   ├── hooks/             # useToast
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                  # Express backend
│   ├── controllers/          # uploadController.js, summarizeController.js
│   ├── routes/                # uploadRoutes.js, summarizeRoutes.js
│   ├── services/               # extractText.js, geminiService.js
│   ├── middleware/             # upload.js (multer), errorHandler.js
│   ├── uploads/                 # temp storage (gitignored, auto-cleaned per request)
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── README.md
├── .gitignore
└── package.json
```

> Note: `index.css` lives at `client/src/index.css` (standard Vite convention) rather than `client/index.css`, so Vite picks it up automatically via the `main.jsx` import.

## API Endpoints

### `POST /api/upload`
Accepts a `multipart/form-data` request with a single `file` field (PDF, PNG, or JPG, up to 10MB). Extracts and returns the document's text.

**Response**
```json
{
  "fileName": "report.pdf",
  "fileSize": 84213,
  "fileType": "application/pdf",
  "extractedText": "...",
  "characterCount": 4310
}
```

### `POST /api/summarize`
Accepts extracted text and a desired summary length, and returns an AI-generated summary.

**Request**
```json
{
  "text": "...",
  "length": "medium"
}
```

**Response**
```json
{
  "summary": "...",
  "keyPoints": ["..."],
  "mainIdeas": ["..."],
  "suggestions": ["..."]
}
```

### `GET /api/health`
Simple health check for uptime monitoring.

## Local Setup

### Prerequisites
- Node.js 18+
- A free [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone and install
```bash
git clone https://github.com/<your-username>/document-summary-assistant.git
cd document-summary-assistant
npm run install:all
```

### 2. Configure environment variables

**Backend** — copy `server/.env.example` to `server/.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MAX_UPLOAD_SIZE=10485760
```

**Frontend** — copy `client/.env.example` to `client/.env`:
```
VITE_API_URL=http://localhost:5000
```

### 3. Run locally
In two terminals:
```bash
npm run dev:server   # starts Express on http://localhost:5000
npm run dev:client   # starts Vite on http://localhost:5173
```

Visit `http://localhost:5173`.

## Environment Variables Reference

| Variable | Location | Description |
|---|---|---|
| `GEMINI_API_KEY` | `server/.env` | Google Gemini API key |
| `PORT` | `server/.env` | Port for the Express server (default `5000`) |
| `CLIENT_ORIGIN` | `server/.env` | Allowed CORS origin(s), comma-separated |
| `MAX_UPLOAD_SIZE` | `server/.env` | Max upload size in bytes (default 10MB) |
| `VITE_API_URL` | `client/.env` | Base URL of the backend API |

## Deployment

### Backend on Render
1. Push this repo to GitHub.
2. In Render, create a **New Web Service** and connect the repo.
3. Set **Root Directory** to `server`.
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Add environment variables: `GEMINI_API_KEY`, `PORT` (Render sets this automatically, but the app also reads `process.env.PORT`), `CLIENT_ORIGIN` (set to your Vercel URL once deployed).
7. Deploy. Note the generated URL, e.g. `https://document-summary-assistant.onrender.com`.

### Frontend on Vercel
1. In Vercel, **Import Project** and select this repo.
2. Set **Root Directory** to `client`.
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Add environment variable `VITE_API_URL` set to your Render backend URL.
7. Deploy. Once live, update `CLIENT_ORIGIN` on Render to this Vercel URL and redeploy the backend so CORS allows it.

### Common Deployment Fixes
- **CORS errors:** Confirm `CLIENT_ORIGIN` on Render exactly matches your Vercel domain (no trailing slash).
- **Render free-tier cold starts:** The first request after inactivity can take 30–60s to wake the service; the loading UI handles this gracefully, but consider a status message for very long waits.
- **File uploads failing on Render:** Render's filesystem is ephemeral — this app already deletes uploaded files immediately after processing, so no persistent storage is required.
- **Gemini quota errors:** Free-tier Gemini keys have rate limits; if you see `GEMINI_REQUEST_FAILED`, wait a moment and retry, or check your quota in Google AI Studio.
- **Build fails on Vercel with Tailwind errors:** Ensure `postcss.config.js` and `tailwind.config.js` are committed — they're required for the Vite build to process Tailwind classes.

## Future Improvements

- Persistent history with a database (e.g., PostgreSQL) instead of session storage
- Multi-file batch summarization
- Support for `.docx` and `.txt` uploads
- User accounts and saved summary libraries
- Streaming AI responses for faster perceived performance
- Automated tests (Jest/Vitest + Playwright)

## License

MIT
