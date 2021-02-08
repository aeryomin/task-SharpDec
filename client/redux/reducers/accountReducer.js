import Cookies from 'universal-cookie'

import {
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_SECOND_PASSWORD,
  LOGIN,
  REGISTRATION
} from '../actionCreators/accountActionCreator'

const cookies = new Cookies()

const initialState = {
  username: '',
  email: '',
  password: '',
  secondPassword: '',
  token: cookies.get('token'),
  user: null,
  balance: 0
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return { ...state, username: action.username }
    }
    case UPDATE_EMAIL: {
      return { ...state, email: action.email }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    case UPDATE_SECOND_PASSWORD: {
      return { ...state, secondPassword: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token, password: '', user: action.user }
    }
    case REGISTRATION: {
      return { ...state, token: action.token, password: '', user: action.user, balance: action.balance }
    }
    default:
      return state
  }
}

export default accountReducer
