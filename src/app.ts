import express from 'express'
import logger from 'morgan'
import userRouter from './user/user.routes'
import { authenticate } from './middlewares/authenticate'

const { PORT } = process.env
const app = express()

app.set('port', PORT)

app
  .use(logger('dev'))
  .use(express.json())

app
  .get('/', authenticate, (req, res) => {
    res.send('Alright in this path')
  })
  .get('/failure', (req, res) => {
    res.send('You are not authenticated')
  })

app
  .use(userRouter)

export default app
