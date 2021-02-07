import React from 'react'
import Cookies from 'universal-cookie'
import Button, { DO_FUNCTION } from '../../components/Button'
import { history } from '../../redux'

const logout = () => {
  const cookie = new Cookies()
  history.push('/login')
  window.location.reload()
  cookie.remove('token')
}

const Main = () => {
  return (
    <div>
      Main
      <Button
        content="Log out"
        action={{ type: DO_FUNCTION, payload: logout }}
      />
    </div>
  )
}

export default Main
