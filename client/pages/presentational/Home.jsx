import React from 'react'
import Button, { FOLLOW_TO_LINK } from '../../components/Button'

const Home = () => {
  return (
    <div>
      Home
      <div className="flex justify-around">
        <Button
          content="Login"
          action={{ type: FOLLOW_TO_LINK, payload: '/login' }}
        />
        <Button
          content="Reg"
          action={{ type: FOLLOW_TO_LINK, payload: '/reg' }}
        />
      </div>
    </div>
  )
}

export default Home
