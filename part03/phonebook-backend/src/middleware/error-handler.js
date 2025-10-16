export function errorHandler(error, request, response, next) {
  console.error(error?.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
    return
  }

  next(error)
}
