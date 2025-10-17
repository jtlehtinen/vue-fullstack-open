import { createApp } from './app.js'
import config from './config.js'
import logger from './lib/logger.js'

async function run() {
  const app = await createApp()
  app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`))
}

run()
