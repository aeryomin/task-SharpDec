export const SET_USERNAME = 'SET_USERNAME'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_PASSWORD = 'SET_PASSWORD'

export const setUsernameActionCreator = (username) => ({
  type: SET_USERNAME,
  username
})

export const setEmailActionCreator = (email) => ({
  type: SET_EMAIL,
  email
})

export const setPasswordActionCreator = (password) => ({
  type: SET_PASSWORD,
  password
})
