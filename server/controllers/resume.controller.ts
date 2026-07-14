import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import { extractText } from '../utils/parse.js'
import { analyzeResume, chatWithAI } from '../services/groq.service.js'
import db from '../database.js'

const RATE_LIMIT = Number(process.env.RATE_LIMIT_PER_HOUR) || 3

function getHourWindow(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0).toISOString()
}

function getDeviceKey(req: Request): string {
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const deviceId = req.headers['x-device-id'] as string | undefined
  return deviceId ? `${ip}|${deviceId}` : ip
}

export class ResumeController {
  async uploadAndAnalyze(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' })
        return
      }

      const deviceKey = getDeviceKey(req)
      const windowStart = getHourWindow()

      const row = db.prepare('SELECT request_count FROM rate_limits WHERE device_key = ? AND window_start = ?').get(deviceKey, windowStart) as { request_count: number } | undefined
      const requestCount = row?.request_count || 0

      if (requestCount >= RATE_LIMIT) {
        res.status(429).json({
          error: `Rate limit exceeded. ${RATE_LIMIT} resumes per hour allowed. Please try again later.`,
          remaining: 0,
          limit: RATE_LIMIT,
        })
        return
      }

      db.prepare(`
        INSERT INTO rate_limits (device_key, window_start, request_count)
        VALUES (?, ?, 1)
        ON CONFLICT(device_key, window_start) DO UPDATE SET request_count = request_count + 1
      `).run(deviceKey, windowStart)

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

      const remaining = Math.max(0, RATE_LIMIT - requestCount - 1)

      res.json({ ...aiResult, remaining, limit: RATE_LIMIT })
    } catch (error) {
      next(error)
    }
  }

  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { messages } = req.body

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ success: false, error: 'Messages array is required', code: 'INVALID_INPUT' })
        return
      }

      const text = await chatWithAI(messages)

      res.json({ content: [{ text }] })
    } catch (error) {
      next(error)
    }
  }

  getHistory(_req: Request, res: Response) {
    const rows = db.prepare('SELECT * FROM analyses ORDER BY created_at DESC LIMIT 10').all()
    res.json(rows)
  }
}
