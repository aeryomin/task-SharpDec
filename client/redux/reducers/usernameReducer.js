import {
  SET_USERNAME,
  SET_EMAIL,
  SET_FIRST_PASSWORD,
  SET_SECOND_PASSWORD
} from '../actionCreators/setUserActionCreator'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.username }
    }
    case SET_EMAIL: {
      return { ...state, email: action.email }
    }
    case SET_FIRST_PASSWORD: {
      return { ...state, firstPassword: action.password }
    }
    case SET_SECOND_PASSWORD: {
      return { ...state, secondPassword: action.password }
    }
    default:
      return state
  }
}

export default userReducer
