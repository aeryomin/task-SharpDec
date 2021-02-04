import { SET_USERNAME } from '../actionCreators/setUsernameActionCreator'

const usernameReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.username }
    }
    default:
      return state
  }
}

export default usernameReducer
