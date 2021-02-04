/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsernameActionCreator } from '../redux/actionCreators/setUsernameActionCreator'

const Main = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const { username } = useSelector((s) => s.user)

  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    console.log(typeof username)
  }, [username])

  return (
    <div className="bg-red-200">
      <label htmlFor="input">
        Input
        <input
          className="border border-black"
          id="input"
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(setUsernameActionCreator(inputValue))
            }
          }}
        />
      </label>
      <div>
        Username:
        {username}
      </div>
    </div>
  )
}

export default Main
