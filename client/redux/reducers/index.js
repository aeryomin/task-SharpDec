import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import accountReducer from './accountReducer'
import transactionsReducer from './transactionsReducer'

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    transactions: transactionsReducer
  })

export default reducer
