import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api.routes.js'
import { errorHandler } from './middleware/error.middleware.js'

export class App {
  private app: express.Application

  constructor() {
    this.app = express()
    this.configureMiddleware()
    this.registerRoutes()
    this.registerErrorHandler()
  }

  private configureMiddleware() {
    this.app.use(cors())
    this.app.use(express.json({ limit: '10mb' }))
  }

  private registerRoutes() {
    this.app.use('/api', apiRoutes)
  }

  private registerErrorHandler() {
    this.app.use(errorHandler)
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}
