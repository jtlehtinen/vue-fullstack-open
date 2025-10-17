import bcrypt from 'bcryptjs'
import express from 'express'
import { User } from '../models/index.js'

export const router = express.Router()

router.get('/', async (_request, response) => {
  const users = await User.find({})
  return response.json(users)
})

router.post('/', async (request, response) => {
  if (!request.body) return response.status(400).end({ error: 'request body missing' })

  const { name, username, password } = request.body

  if (!username || !password) {
    response.status(400).json({ error: 'username and password required' })
    return
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
