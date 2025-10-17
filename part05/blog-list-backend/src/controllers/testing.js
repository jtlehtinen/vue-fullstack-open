import express from 'express'
import { Blog, User } from '../models/index.js'

export const router = express.Router()

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})
