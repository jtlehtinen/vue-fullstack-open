import express from 'express'
import { personsRouter } from './controllers/index.js'

const PORT = 3001

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.use('/api/persons', personsRouter)

app.use((request, response) => {
  response.status(404).json({ error: 'Not found', status: 404 })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
