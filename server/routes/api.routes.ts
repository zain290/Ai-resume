import { Router } from 'express'
import resumeRoutes from './resume.routes.js'
import { ApiController } from '../controllers/api.controller.js'

const router = Router()
const apiController = new ApiController()

router.get('/health', apiController.health)
router.get('/settings', apiController.getSettings)
router.get('/pages/:slug', apiController.getPage)
router.use(resumeRoutes)

export default router
