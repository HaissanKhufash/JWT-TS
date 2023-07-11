import { connect, connection } from 'mongoose'
import { env } from './env'

void (async () => {
  try {
    await connect(env.envDb.mongoUri as string)
    console.log(`DB has been set in: ${connection.name}`)
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()
