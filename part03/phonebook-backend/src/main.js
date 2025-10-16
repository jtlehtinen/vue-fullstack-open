import express from 'express'
import morgan from 'morgan'
import { infoRouter, personsRouter } from './controllers/index.js'

const app = express()

app.disable('x-powered-by')

app.use(express.static('dist/public'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :body'))

app.use('/info', infoRouter)
app.use('/api/persons', personsRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found', status: 404 })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
