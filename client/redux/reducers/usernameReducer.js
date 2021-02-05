import {
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD
} from '../actionCreators/setUserActionCreator'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.username }
    }
    case SET_EMAIL: {
      return { ...state, email: action.email }
    }
    case SET_PASSWORD: {
      return { ...state, password: action.password }
    }
    default:
      return state
  }
}

export default userReducer
