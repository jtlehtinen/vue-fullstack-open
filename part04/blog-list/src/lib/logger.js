import { isTestEnv } from '../config.js'

export function info(...params) {
  if (isTestEnv) return

  console.log(...params)
}

export function error(...params) {
  if (isTestEnv) return

  console.error(...params)
}

export default {
  info,
  error
}
