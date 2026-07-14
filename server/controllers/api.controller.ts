import { Request, Response, NextFunction } from 'express'

export class ApiController {
  health = (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  }

  analyze = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: 'Analyze endpoint ready' })
    } catch (error) {
      next(error)
    }
  }

  getSettings = (_req: Request, res: Response) => {
    res.json({ contact_email: process.env.CONTACT_EMAIL || 'zemz.pro@gmail.com' })
  }

  getPage = (req: Request, res: Response) => {
    res.json({ slug: req.params.slug, content: {} })
  }
}
