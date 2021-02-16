import { ADD_REQUEST_TO_UPDATE_TRANSACTIONS } from '../actionCreators/socketActionCreator'

const initialState = {
  doUpdate: false
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REQUEST_TO_UPDATE_TRANSACTIONS: {
      return { ...state, doUpdate: !state.doUpdate }
    }
    default:
      return state
  }
}

export default socketReducer
