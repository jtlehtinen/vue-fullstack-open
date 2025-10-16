import dotenv from 'dotenv'

dotenv.config({ quiet: true})

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 3003

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

export default {
  MONGODB_URI,
  PORT,
}
