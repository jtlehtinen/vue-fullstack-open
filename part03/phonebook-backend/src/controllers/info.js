import express from 'express'
import db from '../db.js'

export const router = express.Router()

router.get('/', (request, response) => {
  const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phonebook - info</title>
</head>
<body>
  <p>Phonebook has info for ${db.persons.length} people</p>
  </p>${new Date()}</p>
</body>
</html>`

  response.type('html')
  response.send(body)
})
