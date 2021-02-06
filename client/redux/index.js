import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import reducer from './reducers'

const initialState = {}

export const history = createBrowserHistory()

const middleware = [thunk, routerMiddleware(history)]

const store = createStore(
  reducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
