import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import accountReducer from './accountReducer'

const reducer = (history) =>
  combineReducers({ account: accountReducer, router: connectRouter(history) })

export default reducer
