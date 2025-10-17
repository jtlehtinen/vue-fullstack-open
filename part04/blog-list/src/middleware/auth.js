import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import config from '../config.js'
import logger from '../lib/logger.js'

function getTokenFromRequest(request) {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return undefined
}

export async function authenticate(request, response, next) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return next()
  }

  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    console.log('Decoded token:', decodedToken)
    const user = await User.findById(decodedToken.id)

    if (user) {
      request.user = user
    }
  } catch (err) {
    logger.error('Error authenticating user', err)
  }

  next()
}

export function requireAuthenticated(request, response, next) {
  if (!request.user) {
    return response.status(401).json({ error: 'Authentication required' })
  }
  next()
}
