import logger from '../lib/logger.js'

export function errorHandler(error, request, response, next) {
  logger.error(error?.message)

  switch (error.name) {
  case 'ValidationError':
    return response.status(400).json({ error: error.message })
  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' })
  case 'MongoServerError':
    if (error.message.includes('E11000 duplicate key error') && error.keyPattern?.username) {
      return response.status(400).json({ error: 'username must be unique' })
    }
  }

  next(error)
}
