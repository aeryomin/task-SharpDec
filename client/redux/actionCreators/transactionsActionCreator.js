import { getSocket } from '..'
import { SEND_TRANSACTIONS } from '../../constants/socket'
import api from '../fetch/api'

export const GET_USERS = 'GET_USERS'
export const SET_RECIPIENT = 'SET_PAYMENT_DATA'
export const SET_AMOUNT = 'SET_AMOUNT'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

export const getUsers = () => async (dispatch) => {
  const users = await api.getUsersFetch()

  dispatch({ type: GET_USERS, users })
}

export const getTransactions = () => async (dispatch) => {
  const transactions = await api.getTransactionsFetch()

  dispatch({ type: GET_TRANSACTIONS, transactions })
}

export const setRecipient = (id) => {
  return { type: SET_RECIPIENT, id }
}

export const setAmount = (amount) => {
  return { type: SET_AMOUNT, amount }
}

export const submitPayment = () => async (dispatch, getState) => {
  const { recipientId, amount } = getState().transactions.payment
  const { transactionToken } = getState().account.user

  if (typeof recipientId !== 'undefined' && typeof amount !== 'undefined') {
    await api.submitPaymentFetch(recipientId, amount, transactionToken)

    getSocket().emit('message', { type: SEND_TRANSACTIONS, recipientId })

    dispatch(getTransactions())
    dispatch(setRecipient(''))
    dispatch(setAmount(''))
  }
}
