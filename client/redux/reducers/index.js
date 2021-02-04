import { combineReducers } from 'redux'
import usernameReducer from './usernameReducer'

const reducer = combineReducers({ user: usernameReducer })

export default reducer
