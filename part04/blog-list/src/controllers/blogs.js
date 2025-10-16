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
