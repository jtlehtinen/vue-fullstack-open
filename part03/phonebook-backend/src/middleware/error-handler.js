export function errorHandler(error, request, response, next) {
  console.error(error?.message)

  switch (error.name) {
  case 'ValidationError':
    response.status(400).json({ error: error.message })
    return
  case 'CastError':
    response.status(400).send({ error: 'malformatted id' })
    return
  case 'MongoServerError':
    if (error.code === 11000) {
      response.status(400).json({ error: 'name must be unique' })
      return
    }
  }

  next(error)
}
