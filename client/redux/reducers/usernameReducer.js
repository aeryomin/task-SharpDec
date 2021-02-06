import {
  UPDATE_USERNAME,
  UPDATE_EMAIL,
  UPDATE_FIRST_PASSWORD,
  UPDATE_SECOND_PASSWORD,
  LOGIN
} from '../actionCreators/accountActionCreator'

const initialState = {
  username: '',
  email: '',
  firstPassword: '',
  secondPasword: '',
  token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USERNAME: {
      return { ...state, username: action.username }
    }
    case UPDATE_EMAIL: {
      return { ...state, email: action.email }
    }
    case UPDATE_FIRST_PASSWORD: {
      return { ...state, firstPassword: action.password }
    }
    case UPDATE_SECOND_PASSWORD: {
      return { ...state, secondPassword: action.password }
    }
    case LOGIN: {
      return { ...state, token: action.token }
    }
    default:
      return state
  }
}

export default userReducer
