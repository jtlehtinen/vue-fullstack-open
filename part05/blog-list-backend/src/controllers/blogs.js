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

router.delete('/:id', requireAuthenticated, async (request, response) => {
  const user = request.user

  const blogIdToDelete = request.params.id
  const blog = await Blog.findById(blogIdToDelete)
  if (!blog) {
    return response.status(404).end({ error: 'blog not found' })
  }

  const currentUserId = user._id.toString()
  const creatorId = blog.user.toString()
  const isCreator = currentUserId && (currentUserId === creatorId)

  if (!isCreator) {
    return response.status(403).json({ error: 'forbidden' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(b => b.toString() !== blogIdToDelete)
  await user.save()

  return response.status(204).end()
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

  const updatedBlogWithUser = await Blog.populate(updatedBlog, { path: 'user', select: { username: 1, name: 1 } })

  response.json(updatedBlogWithUser)
})
