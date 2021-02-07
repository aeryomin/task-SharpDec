import Cookies from 'universal-cookie'

import {
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_SECOND_PASSWORD,
  LOGIN
} from '../actionCreators/accountActionCreator'

const cookies = new Cookies()

const initialState = {
  username: '',
  email: '',
  password: '',
  secondPasword: '',
  token: cookies.get('token'),
  user: null
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
    default:
      return state
  }
}

export default accountReducer
