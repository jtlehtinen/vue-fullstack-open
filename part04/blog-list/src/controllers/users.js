import bcrypt from 'bcryptjs'
import express from 'express'
import { User } from '../models/index.js'

export const router = express.Router()

router.get('/', async (_request, response) => {
  const users = await User
    .find()
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  return response.json(users)
})

router.post('/', async (request, response) => {
  if (!request.body) return response.status(400).end({ error: 'request body missing' })

  const { name, username, password } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password is required' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const createdUser = await user.save()

  response.status(201).json(createdUser)
})
