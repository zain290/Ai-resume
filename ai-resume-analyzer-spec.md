# Micro-SaaS Project Specification: 3D-Enhanced AI Resume Analyzer

This document provides the complete architecture, UI/UX guidelines, and backend implementation logic for building an **AI Resume Analyzer**. It validates resumes against the Google XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]"), checks keyword matches against a job description, and provides a final score with actionable feedback.

---

## 1. Project Tech Stack & Architecture

- **Frontend:** React.js, TypeScript, Tailwind CSS, Framer Motion (for appearing transitions)
- **3D Interactive Layer:** React Three Fiber (`@react-three/fiber`), `@react-three/drei`, `gltfjsx`
- **Backend:** Node.js (Express), TypeScript, SQLite (via `sqlite3` or `better-sqlite3`)
- **File Parsing:** `multer` (upload handling), `pdf-parse` (for .pdf), `mammoth` (for .docx)
- **AI Engine:** Groq Cloud API (using `llama-3.3-70b-versatile`)

---

## 2. The 3D Component Strategy: Finding & Using Pre-made Models

Finding high-quality, pre-made React components for specific 3D objects (like a CV or a folder) is difficult because 3D assets are usually distributed as standard 3D files (GLTF/GLB), not pre-packaged React code. 

**Here is the exact pipeline to get pre-made 3D models into your React project:**

### Method A: The `gltfjsx` Pipeline (Recommended for Customization)
1. **Source the Model:** Go to free 3D marketplaces like **Sketchfab**, **Poly Pizza**, or **Market.pmnd.rs**. Download a "Document", "Clipboard", or "Folder" model in `.glb` or `.gltf` format.
2. **Convert to React Component:** Use the Poimandres CLI tool `gltfjsx`. Run this in your terminal where the file is downloaded:
   ```bash
   npx gltfjsx your-downloaded-model.glb
   ```
3. **Import and Use:** This generates a `.jsx` or `.tsx` file containing the pre-made React Three Fiber component. You simply drop this into your `<Canvas>` and add `<PresentationControls>` or `<Float>` from `@react-three/drei` to make it animate smoothly.

### Method B: Spline (The No-Code 3D Alternative)
If you want ready-to-use, interactive 3D web components without managing geometry code:
1. Browse the **Spline Community Library** (spline.design) for pre-made UI elements (like floating folders or papers).
2. Export the scene for React.
3. Install `@splinetool/react-spline` and import the generated URL directly.

---

## 3. UI/UX Design & Frontend Implementation

The interface must maintain a **clean and modern look**, utilizing high animation fidelity and elegant appearing transitions.

### A. Layout & Flow
- **Split-Screen Design:** 
  - *Left Pane:* The 3D Canvas featuring a floating folder/resume that opens or glows when a file is dropped.
  - *Right Pane:* A frosted-glass upload zone (`backdrop-blur-md bg-white/10 border border-white/20`) using Framer Motion for smooth, sequential fade-ins (`initial={{ opacity: 0, y: 20 }}`).
- **Input Fields:**
  1. Drag-and-drop zone for PDF/DOC/DOCX files.
  2. Text area for the Target Job Description.
- **Results Dashboard:**
  - **Score Ring:** An SVG circular progress bar animating from 0 to the final AI score.
  - **XYZ Analysis:** Highlighted text showing where the user missed the "Accomplished X, measured by Y, by doing Z" structure.
  - **Keyword Match Rate:** Green/Red pill badges showing matched vs. missing keywords.

---

## 4. Backend Implementation & SQLite Storage

### A. Database Setup (`database.ts`)
Use SQLite to keep the project lightweight and fast.

```typescript
import Database from 'better-sqlite3';

const db = new Database('resumes.db', { verbose: console.log });

// Initialize Table
db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    job_description TEXT,
    overall_score INTEGER,
    xyz_feedback TEXT,
    missing_keywords TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
```

### B. File Upload & Parsing Endpoint (`server.ts`)
1. **Multer Setup:** Configure Multer to accept only `application/pdf`, `application/msword`, and `application/vnd.openxmlformats-officedocument.wordprocessingml.document`. Limit file size to 5MB.
2. **Text Extraction:**
   - If PDF: Use `pdf-parse` to extract raw text.
   - If DOCX: Use `mammoth.extractRawText({ buffer: req.file.buffer })`.

### C. The AI Prompt Engineering (Groq API)
Construct a strict system prompt to force the AI to return structured JSON. 

**System Prompt Example:**
> "You are an expert Google Tech Recruiter. Analyze the provided resume text against the provided job description.
> 1. Grade the resume out of 100 based on formatting, impact, and keyword matching.
> 2. Check strictly for the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Identify weak bullet points that fail this rule.
> 3. Extract missing critical keywords from the job description.
> Return ONLY a JSON object with the following schema: { 'score': number, 'xyz_improvements': string[], 'matched_keywords': string[], 'missing_keywords': string[], 'overall_summary': string }"

### D. Saving to SQLite
Once the JSON response is received from Groq:
```typescript
const stmt = db.prepare(`
  INSERT INTO analyses (filename, job_description, overall_score, xyz_feedback, missing_keywords)
  VALUES (?, ?, ?, ?, ?)
`);
stmt.run(
  req.file.originalname, 
  req.body.jobDescription, 
  aiResult.score, 
  JSON.stringify(aiResult.xyz_improvements), 
  JSON.stringify(aiResult.missing_keywords)
);
```

---

## 5. Blueprint Prompt for Developer AI (Claude/Cursor)

To execute this build, paste the following into your AI coding assistant:

> *"Build a full-stack AI Resume Analyzer. Backend: Node.js, Express, SQLite (using better-sqlite3), Multer for PDF/DOCX uploads, and Groq Cloud API for AI analysis. The AI must score the resume and check for the Google XYZ formatting rule. Frontend: React, Tailwind CSS, Framer Motion. Create a highly animated, clean, modern UI with smooth appearing transitions. Include a React Three Fiber canvas space to host a floating 3D document component. Implement the SQLite schema provided in the spec and return the AI analysis cleanly to the dashboard."*
