import { Router } from 'express'
import { upload } from '../middleware/upload.middleware.js'
import { ResumeController } from '../controllers/resume.controller.js'

const router = Router()
const controller = new ResumeController()

router.post('/upload-analyze', upload.single('resume'), controller.uploadAndAnalyze.bind(controller))
router.get('/history', controller.getHistory.bind(controller))

export default router
