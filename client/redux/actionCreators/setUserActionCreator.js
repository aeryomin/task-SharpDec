export const SET_USERNAME = 'SET_USERNAME'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_FIRST_PASSWORD = 'SET_FIRST_PASSWORD'
export const SET_SECOND_PASSWORD = 'SET_SECOND_PASSWORD'

export const setUsernameActionCreator = (username) => ({
  type: SET_USERNAME,
  username
})

export const setEmailActionCreator = (email) => ({
  type: SET_EMAIL,
  email
})

export const setFirstPasswordActionCreator = (password) => ({
  type: SET_FIRST_PASSWORD,
  password
})

export const setSecondPasswordActionCreator = (password) => ({
  type: SET_SECOND_PASSWORD,
  password
})
