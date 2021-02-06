/* eslint-disable no-console */
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_SECOND_PASSWORD = 'UPDATE_SECOND_PASSWORD'
export const LOGIN = 'LOGIN'

export const setUsernameActionCreator = (username) => ({
  type: UPDATE_USERNAME,
  username
})

export const setEmailActionCreator = (email) => ({
  type: UPDATE_EMAIL,
  email
})

export const setFirstPasswordActionCreator = (password) => ({
  type: UPDATE_PASSWORD,
  password
})

export const setSecondPasswordActionCreator = (password) => ({
  type: UPDATE_SECOND_PASSWORD,
  password
})

export const logIn = () => async (dispatch, getState) => {
  const { email, password } = getState().account

  const response = await fetch('/api/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const account = await response.json()

  dispatch({ type: LOGIN, token: account.token, user: account.user })
}
