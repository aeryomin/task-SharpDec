/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import './config'

const PORT = process.env.PORT || 8090

const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((item) => server.use(item))

server.get('/', (req, res) => {
  res.send('Server is done')
})

server.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  return console.log(`Serving at http://localhost:${PORT}`)
})
