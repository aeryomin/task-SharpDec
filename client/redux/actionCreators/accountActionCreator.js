import axios from 'axios'
import { history, getSocket } from '..'
import { SEND_USERS } from '../../constants/socket'

export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_SECOND_PASSWORD = 'UPDATE_SECOND_PASSWORD'
export const LOGIN = 'LOGIN'
export const REGISTRATION = 'REGISTRATION'

export const setUsernameActionCreator = (username) => ({
  type: UPDATE_USERNAME,
  username
})

export const setEmailActionCreator = (email) => ({
  type: UPDATE_EMAIL,
  email
})

export const setPasswordActionCreator = (password) => ({
  type: UPDATE_PASSWORD,
  password
})

export const setSecondPasswordActionCreator = (password) => ({
  type: UPDATE_SECOND_PASSWORD,
  password
})

export const logIn = () => async (dispatch, getState) => {
  const { email, password } = getState().account

  const response = await axios.post('/api/v1/auth', { email, password })
  const account = response.data

  dispatch({ type: LOGIN, token: account.token, user: account.user })
  history.push('/main')
}

export const tryLogIn = () => async (dispatch) => {
  const response = await axios('/api/v1/auth')
  const account = response.data
  dispatch({ type: LOGIN, token: account.token, user: account.user })
  history.push('/main')
}

export const registration = () => async (dispatch, getState) => {
  const { username, email, password } = getState().account
  const response = await axios.post('/api/v1/auth/registration', {
    username,
    email,
    password
  })
  const account = response.data

  dispatch({
    type: REGISTRATION,
    token: account.token,
    user: account.user,
    balance: 500
  })
  getSocket().emit('message', { type: SEND_USERS })
  history.push('/main')
}
