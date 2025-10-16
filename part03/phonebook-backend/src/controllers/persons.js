import express from 'express'
import db from '../db.js'

export const router = express.Router()

router.get('/', (_, res) => {
  res.json(db.persons)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const person = db.persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.persons = db.persons.filter(p => p.id !== id)

  res.status(204).end()
})
