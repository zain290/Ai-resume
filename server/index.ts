import dotenv from 'dotenv'
dotenv.config()

import { App } from './app.js'

const app = new App()
app.start(Number(process.env.PORT) || 5301)
