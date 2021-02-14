import {
  GET_USERS,
  SET_RECIPIENT,
  SET_AMOUNT,
  GET_TRANSACTIONS
} from '../actionCreators/transactionsActionCreator'

const initialState = {
  users: [],
  payment: {
    recipientId: '',
    amount: null
  },
  transactions: []
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.users }
    }
    case GET_TRANSACTIONS: {
      return { ...state, transactions: action.transactions }
    }
    case SET_RECIPIENT: {
      return {
        ...state,
        payment: {
          recipientId: action.id
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
