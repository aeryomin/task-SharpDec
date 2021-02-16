import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import accountReducer from './accountReducer'
import transactionsReducer from './transactionsReducer'
import transactionsToRenderReducer from './transactionsToRenderReducer'
import socketReducer from './socketReducer'

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    transactions: transactionsReducer,
    transactionsToRender: transactionsToRenderReducer,
    socket: socketReducer
  })

export default reducer
