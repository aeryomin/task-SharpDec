import {
  ADD_REQUEST_TO_UPDATE_TRANSACTIONS,
  ADD_REQUEST_TO_SEND_USERS
} from '../actionCreators/socketActionCreator'

const initialState = {
  doUpdate: false,
  sendUsers: false
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST_TO_UPDATE_TRANSACTIONS: {
      return { ...state, doUpdate: !state.doUpdate }
    }
    case ADD_REQUEST_TO_SEND_USERS: {
      return { ...state, sendUsers: !state.sendUsers }
    }
    default:
      return state
  }
}

export default socketReducer
