import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Blog } from './models/index.js'

dotenv.config({ quiet: true })

async function run() {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  mongoose.connect(MONGODB_URI)

  const app = express()
  app.disable('x-powered-by')

  app.use(express.json())

  app.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
  })

  app.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  })

  const PORT = Number(process.env.PORT) || 3003
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

run()
