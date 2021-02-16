import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { io } from 'socket.io-client'

import reducer from './reducers'

let socket

const initialState = {}

export const history = createBrowserHistory()

const middleware = [thunk, routerMiddleware(history)]

const store = createStore(
  reducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

if (
  typeof process.env.ENABLE_SOCKETS !== 'undefined' &&
  process.env.ENABLE_SOCKETS
) {
  socket = io(`http://localhost:${process.env.PORT}`)
}

export function getSocket() {
  return socket
}

export default store
