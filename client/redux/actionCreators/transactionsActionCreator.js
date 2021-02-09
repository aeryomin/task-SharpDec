export const GET_USERS = 'GET_USERS'
export const SET_RECIPIENT = 'SET_PAYMENT_DATA'
export const SET_AMOUNT = 'SET_AMOUNT'

export const getUsers = () => async (dispatch) => {
  const response = await fetch('/api/v1/auth/users')
  const users = await response.json()
  dispatch({ type: GET_USERS, users })
}

export const setRecipient = (id, username) => {
  return { type: SET_RECIPIENT, id, username, date: new Date() }
}

export const setAmount = (amount) => {
  return { type: SET_AMOUNT, amount }
}
