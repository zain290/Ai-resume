import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import apiRoutes from './routes/api.routes.js'
import sitemapRoutes from './routes/sitemap.routes.js'
import { errorHandler } from './middleware/error.middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class App {
  private app: express.Application

  constructor() {
    this.app = express()
    this.configureMiddleware()
    this.configureStaticFiles()
    this.registerRoutes()
    this.registerErrorHandler()
  }

  private configureMiddleware() {
    this.app.use(cors())
    this.app.use(express.json({ limit: '10mb' }))
  }

  private configureStaticFiles() {
    const publicPath = path.resolve(__dirname, '../public')
    this.app.use(express.static(publicPath))
    this.app.use('/robots.txt', express.static(path.join(publicPath, 'robots.txt')))
  }

  private registerRoutes() {
    this.app.use('/api', apiRoutes)
    this.app.use(sitemapRoutes)
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
