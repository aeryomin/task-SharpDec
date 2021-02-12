/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
import express from 'express'
import socketIO from 'socket.io'
import http from 'http'

const port = 8081

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
})

server.listen(port, () => {
  console.log(`listening on localhost:${port}`)
})
