import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../components/Header'
import Button, { DO_FUNCTION } from '../../components/Button'
// import FormInput from '../../components/FormInput'
import { getUsers } from '../../redux/actionCreators/transactionsActionCreator'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
}

const filterUser = (users, inputValue) => {
  return users.filter((user) => user.username.includes(inputValue, 0))
}

const Main = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const { users } = useSelector((s) => s.transactions)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    filterUser(users, inputValue)
  }, [inputValue])

  return (
    <div>
      <Header />
      <div>
        <input
          className="border border-gray-400 rounded"
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
      </div>
      <div>
        {filterUser(users, inputValue).map((user) => {
          return <div key={user._id}>{user.username}</div>
        })}
      </div>
      <div className="mt-10">
        <Button
          content="Log out"
          action={{ type: DO_FUNCTION, payload: logout }}
        />
      </div>
    </div>
  )
}

export default Main
