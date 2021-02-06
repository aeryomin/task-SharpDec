import { combineReducers } from 'redux'
import userReducer from './usernameReducer'

const reducer = combineReducers({ account: userReducer })

export default reducer
