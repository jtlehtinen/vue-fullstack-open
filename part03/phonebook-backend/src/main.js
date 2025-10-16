import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { infoRouter, personsRouter } from './controllers/index.js'
import { errorHandler } from './middleware/index.js'

dotenv.config({ quiet: true })

async function openDB(uri) {
  await mongoose.connect(uri)
}

async function closeDB() {
  await mongoose.connection.close()
}

async function run() {
  const PORT = Number(process.env.PORT) || 3001
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  try {
    await openDB(MONGODB_URI)

    const app = express()

    app.disable('x-powered-by')

    app.use(express.static('dist/public'))
    app.use(express.json())

    morgan.token('body', (req) => JSON.stringify(req.body))
    app.use(morgan(':method :url :status :response-time ms - :body'))

    app.use('/info', infoRouter)
    app.use('/api/persons', personsRouter)

    app.use((req, res) => res.status(404).json({ error: 'Not found', status: 404 }))
    app.use(errorHandler)

    const server = app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`)
    })

    const shutdown = async () => {
      console.log('Shutting down server...')
      server.close(async () => {
        await closeDB()
        console.log('Database connection closed.')
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch(err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

run()
