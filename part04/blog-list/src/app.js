import express from 'express'
import mongoose from 'mongoose'
import { blogRouter, loginRouter, userRouter } from './controllers/index.js'
import { errorHandler, requestLogger, unknownEndpoint } from './middleware/index.js'
import config from './config.js'

export async function createApp() {
  mongoose.connect(config.MONGODB_URI)

  const app = express()
  app.disable('x-powered-by')

  app.use(express.json())
  app.use(requestLogger)

  app.use('/api/blogs', blogRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/users', userRouter)

  app.use(unknownEndpoint)
  app.use(errorHandler)

  return app
}
