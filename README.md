# Document Summary Assistant

An AI-powered web application that helps users quickly understand PDFs and images by extracting their content and generating useful document insights.

I built this project as part of a technical assessment for a Software Engineer position at Unthinkable Solutions.

## Live Demo

**Frontend:** https://document-summary-assistant-pied-zeta.vercel.app/

**Backend API:** https://document-summary-assistant-api-ths8.onrender.com/

## What it does

The application allows users to upload a PDF, PNG, or JPG file and get an AI-generated analysis of the document.

The application:

- Extracts text from PDF files
- Uses OCR to extract text from images
- Generates AI-powered summaries using Google Gemini
- Provides key points and main ideas
- Gives suggestions for improving the document
- Allows users to choose between short, medium, and long summaries
- Shows the extracted text
- Provides copy and download options
- Displays file information, character count, and estimated reading time
- Handles invalid files, empty documents, extraction failures, and API errors

## Features

### File Upload

- Drag-and-drop file upload
- Supports PDF, PNG, and JPG
- Maximum file size of 10 MB
- Displays uploaded file details

### Document Processing

- PDF text extraction using `pdf-parse`
- Image text extraction using `Tesseract.js`
- Temporary file storage using `Multer`

### AI Summarization

Google Gemini is used to generate:

- Summary
- Key points
- Main ideas
- Improvement suggestions

Users can select:

- Short
- Medium
- Long

summary lengths.

### User Interface

The frontend includes:

- Dark-themed interface
- Responsive design
- Drag-and-drop upload area
- Loading states
- Animated result cards
- Toast notifications
- Copy and download functionality
- Recent uploads during the current session

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend

- Node.js
- Express.js
- Multer
- pdf-parse
- Tesseract.js

### AI

- Google Gemini API

### Deployment

- Frontend: Vercel
- Backend: Render
- Source Code: GitHub

## Project Structure

```text
document-summary-assistant/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md