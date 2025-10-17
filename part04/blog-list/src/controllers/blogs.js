import express from 'express'
import { Blog } from '../models/index.js'

export const router = express.Router()

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  if (!request.body) return response.status(400).end({ error: 'request body missing' })

  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})
