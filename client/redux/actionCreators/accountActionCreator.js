/* eslint-disable no-console */
export const UPDATE_USERNAME = 'SET_USERNAME'
export const UPDATE_EMAIL = 'SET_EMAIL'
export const UPDATE_FIRST_PASSWORD = 'SET_FIRST_PASSWORD'
export const UPDATE_SECOND_PASSWORD = 'SET_SECOND_PASSWORD'
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
  type: UPDATE_FIRST_PASSWORD,
  password
})

export const setSecondPasswordActionCreator = (password) => ({
  type: UPDATE_SECOND_PASSWORD,
  password
})

// export function logIn() {
//   return (dispatch, getState) => {
//     console.log('click')

//     const { username, firstPassword } = getState().account

//     fetch('/api/v1/auth', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username,
//         firstPassword
//       })
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         dispatch({ type: LOGIN, token: data.token })
//       })
//   }
// }

export const logIn = () => async (dispatch, getState) => {
  console.log('click')

  const { username, firstPassword } = getState().account

  const response = await fetch('/api/v1/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      firstPassword
    })
  })

  const user = response.json()
  console.log(user)
}
