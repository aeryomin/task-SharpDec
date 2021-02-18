import axios from 'axios'
import { getSocket } from '..'
import { SEND_TRANSACTIONS } from '../../constants/socket'

export const GET_USERS = 'GET_USERS'
export const SET_RECIPIENT = 'SET_PAYMENT_DATA'
export const SET_AMOUNT = 'SET_AMOUNT'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

export const getUsers = () => async (dispatch) => {
  const response = await axios('/api/v1/transactions/protected/users/list')
  const users = response.data
  dispatch({ type: GET_USERS, users })
}

export const getTransactions = () => async (dispatch) => {
  const response = await axios('/api/v1/transactions/protected/transactions')
  const transactions = response.data
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
    await axios.post(
      '/api/v1/transactions/protected/transactions',
      {
        recipientId,
        amount
      },
      {
        headers: {
          Authorization: `Bearer ${transactionToken}`
        }
      }
    )

    getSocket().emit('message', { type: SEND_TRANSACTIONS, recipientId })

    dispatch(getTransactions())
    dispatch(setRecipient(''))
    dispatch(setAmount(''))
  }
}
