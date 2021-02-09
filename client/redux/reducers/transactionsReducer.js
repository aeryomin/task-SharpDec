import {
  GET_USERS,
  SET_RECIPIENT,
  SET_AMOUNT
} from '../actionCreators/transactionsActionCreator'

const initialState = {
  users: [],
  payment: {
    recipientId: '',
    date: null,
    username: '',
    amount: null
    // balance: null
  }
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.users }
    }
    case SET_RECIPIENT: {
      return {
        ...state,
        payment: {
          recipientId: action.id,
          username: action.username,
          date: action.date
        }
      }
    }
    case SET_AMOUNT: {
      return { ...state, payment: { ...state.payment, amount: action.amount } }
    }
    default:
      return state
  }
}

export default transactionsReducer
