import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../components/Header'
import Button, { DO_FUNCTION } from '../../components/Button'
import { getUsers } from '../../redux/actionCreators/transactionsActionCreator'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
}

const filterUser = (users, inputValue) => {
  return users.filter((user) => user.username.indexOf(inputValue, 0) === 0)
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
    <div className="h-screen">
      <Header />
      <div className="border border-gray-200 rounded w-1/4 h-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
        <input
          className="border border-gray-400 rounded w-full"
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
        />
      </div>
      {inputValue && (
        <div>
          {filterUser(users, inputValue).map((user) => {
            return (
              <div key={user._id}>
                <button
                  type="button"
                  className="hover:bg-gray-200"
                  onClick={() => {
                    setInputValue(user.username)
                  }}
                >
                  {user.username}
                </button>
              </div>
            )
          })}
        </div>
      )}
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
