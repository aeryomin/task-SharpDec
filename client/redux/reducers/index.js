import { combineReducers } from 'redux'
import userReducer from './usernameReducer'

const reducer = combineReducers({ user: userReducer })

export default reducer
