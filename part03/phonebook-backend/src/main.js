import express from 'express'
import { infoRouter, personsRouter } from './controllers/index.js'

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.use('/info', infoRouter)
app.use('/api/persons', personsRouter)

app.use((request, response) => {
  response.status(404).json({ error: 'Not found', status: 404 })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
