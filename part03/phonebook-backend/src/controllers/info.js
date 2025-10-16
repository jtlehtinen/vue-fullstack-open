import express from 'express'
import { Person } from '../models/index.js'

export const router = express.Router()

router.get('/', async (req, res) => {
  const personCount = await Person.countDocuments()

  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phonebook - info</title>
</head>
<body>
  <p>Phonebook has info for ${personCount} people</p>
  </p>${new Date()}</p>
</body>
</html>`

  res.type('html')
  res.send(body)
})
