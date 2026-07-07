import { Router } from 'express'
import apiRoutes from './api.routes.js'

const router = Router()
router.use(apiRoutes)

export { router as routes }
