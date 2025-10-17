import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
export const isTestEnv = environment === 'test'
export const isDevelopmentEnv = environment === 'development'
export const isProductionEnv = environment === 'production'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
  quiet: true
})

export const MONGODB_URI = process.env.MONGODB_URI
export const PORT = process.env.PORT || 3003

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

export default {
  MONGODB_URI,
  PORT,
}
