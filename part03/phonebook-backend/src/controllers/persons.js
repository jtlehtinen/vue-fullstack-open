import express from 'express'
import { nanoid } from 'nanoid'
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

router.post('/', (req, res) => {
  const name = req.body?.name
  const number = req.body?.number

  const errors = []
  if (!name) errors.push('name is required')
  if (!number) errors.push('number is required')

  if (db.persons.find(p => p.name.localeCompare(name, undefined, { sensitivity: 'base' }) === 0)) {
    errors.push('name must be unique')
  }

  if (errors.length > 0) {
    res.status(400).json({ errors })
    return
  }

  const id = nanoid()
  const newPerson = { id, name, number }

  db.persons = [...db.persons, newPerson]

  res.status(201).json(newPerson)
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.persons = db.persons.filter(p => p.id !== id)

  res.status(204).end()
})
