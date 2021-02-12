import { getSocket } from '..'
import { SEND_TRANSACTIONS } from '../../constants/socket'

export const GET_USERS = 'GET_USERS'
export const SET_RECIPIENT = 'SET_PAYMENT_DATA'
export const SET_AMOUNT = 'SET_AMOUNT'
export const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

export const getUsers = () => async (dispatch) => {
  const response = await fetch('/api/v1/transactions/protected/users/list')
  const users = await response.json()
  dispatch({ type: GET_USERS, users })
}

export const getTransactions = () => async (dispatch) => {
  const response = await fetch('/api/v1/transactions/protected/transactions')
  const transactions = await response.json()
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
  const { transToken, _id } = getState().account.user

  const response = await fetch('/api/v1/transactions/protected/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${transToken}`
    },
    body: JSON.stringify({ recipientId, amount })
  })

  const transaction = await response.json()
  console.log('transaction: ', transaction)

  getSocket().emit('message', { type: SEND_TRANSACTIONS, userId: _id })

  dispatch({ type: SUBMIT_PAYMENT, amount: transaction.amount })
  dispatch(getTransactions())
}
