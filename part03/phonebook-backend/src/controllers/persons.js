import express from 'express'
import { persons } from '../db.js'

export const router = express.Router()

router.get('/', (_, res) => {
  res.json(persons)
})
