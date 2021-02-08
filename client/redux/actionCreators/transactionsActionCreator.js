export const GET_USERS = 'GET_USERS'

export const getUsers = () => async (dispatch) => {
  const response = await fetch('/api/v1/auth/users')
  const users = await response.json()
  dispatch({ type: GET_USERS, users })
}
