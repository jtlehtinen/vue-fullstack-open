import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import config from '../config.js'

export const router = express.Router()

router.post('/', async (request, response) => {
  const username = request.body?.username
  const password = request.body?.password

  if (!username || !password) {
    response.status(400).json({ error: 'username and password required' })
    return
  }

  const user = await User.findOne({ username })
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: 'invalid username or password' })
    return
  }

  const userForToken= {
    username: user.username,
    id: user._id.toString()
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})
