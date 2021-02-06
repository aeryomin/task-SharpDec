import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import accountReducer from './accountReducer'

const reducer = (history) =>
  combineReducers({ router: connectRouter(history), account: accountReducer })

export default reducer
