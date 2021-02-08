import { GET_USERS } from '../actionCreators/transactionsActionCreator'

const initialState = {
  users: []
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.users }
    }
    default:
      return state
  }
}

export default transactionsReducer
