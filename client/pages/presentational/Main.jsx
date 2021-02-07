import React from 'react'
import Cookies from 'universal-cookie'
import Button, { DO_FUNCTION } from '../../components/Button'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
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
