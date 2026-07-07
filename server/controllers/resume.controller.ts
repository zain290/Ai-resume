import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { extractText } from '../utils/parse.js'
import { analyzeResume } from '../services/groq.service.js'
import db from '../database.js'

export class ResumeController {
  async uploadAndAnalyze(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' })
        return
      }

      const jobDescription = req.body.jobDescription || ''

      const resumeText = await extractText(req.file.path, req.file.mimetype)
      const aiResult = await analyzeResume(resumeText, jobDescription)

      const stmt = db.prepare(`
        INSERT INTO analyses (filename, job_description, overall_score, xyz_feedback, missing_keywords, matched_keywords, overall_summary)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      stmt.run(
        req.file.originalname,
        jobDescription,
        aiResult.score,
        JSON.stringify(aiResult.xyz_improvements),
        JSON.stringify(aiResult.missing_keywords),
        JSON.stringify(aiResult.matched_keywords),
        aiResult.overall_summary,
      )

      fs.unlink(req.file.path, () => {})

      res.json(aiResult)
    } catch (error) {
      next(error)
    }
  }

  getHistory(_req: Request, res: Response) {
    const rows = db.prepare('SELECT * FROM analyses ORDER BY created_at DESC LIMIT 10').all()
    res.json(rows)
  }
}
