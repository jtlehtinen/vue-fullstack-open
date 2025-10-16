import express from 'express'
import { Person } from '../models/index.js'

export const router = express.Router()

router.get('/', async (_, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const person = await Person.findById(id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
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

  const createdPerson = await Person.create({ name, number })

  res.status(201).json(createdPerson)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const name = req.body?.name
  const number = req.body?.number

  const errors = []
  if (!name) errors.push('name is required')
  if (!number) errors.push('number is required')

  if (errors.length > 0) {
    res.status(400).json({ errors })
    return
  }

  const updatedPerson = await Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedPerson) {
    res.json(updatedPerson)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Person.findByIdAndDelete(id)

  res.status(204).end()
})
