import express from 'express'
import { Blog, User } from '../models/index.js'
import { requireAuthenticated } from '../middleware/index.js'

export const router = express.Router()

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find()
    .populate('user', { username: 1, name: 1 })

  return response.json(blogs)
})

router.post('/', requireAuthenticated, async (request, response) => {
  const user = request.user

  const blog = new Blog({ ...request.body, user: user._id })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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
