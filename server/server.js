/* eslint-disable no-console */
import express from 'express'
import http from 'http'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import socketIO from 'socket.io'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import config from './config'
import authRoutes from './routes/api/auth.routes'
import transactionsRoutes from './routes/api/transactions.routes'
// import Transaction from './model/Transactions.model'

mongooseService.connect()

const PORT = process.env.PORT || 8090

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: `http://localhost:${process.env.CLIENT_DEV_PORT}`,
    methods: ['GET', 'POST']
  }
})

let connections = {}

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((item) => app.use(item))

passport.use('jwt', passportJWT.jwt)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/transactions', transactionsRoutes)

if (config.isSocketsEnabled) {
  io.on('connection', (socket) => {
    console.log('-->> a user connected', socket.id)
    // console.log(connections)

    socket.on('message', async (msg) => {
      console.log(msg)
      connections = { ...connections, [msg.userId]: socket.id }
      console.log(connections)
      // switch (msg) {
      //   case 'SEND_TRANSACTIONS': {
      //     console.log('Transactions are updated')
      //     // io.emit('message', { type: 'UPDATE_TRANSACTIONS' })
      //     return ''
      //   }
      //   default:
      //     return ''
      // }
      // console.log(msg)
      // io.emit('message', 'Hi, client')
    })
  })
}

server.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  return console.log(`Serving at http://localhost:${PORT}`)
})
