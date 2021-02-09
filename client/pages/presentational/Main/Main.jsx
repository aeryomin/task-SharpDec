import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../../components/Header'
import Button, { DO_FUNCTION } from '../../../components/Button'
import { getUsers } from '../../../redux/actionCreators/transactionsActionCreator'
import InputUser from './InputUser'
import Autocomplete, { filterUser } from './Autocomplete'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
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
    <div className="h-screen flex flex-col justify-start">
      <Header />
      <div className="flex h-full">
        <div className="border border-gray-200 rounded w-1/2 h-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
          <div className="flex">
            <InputUser inputValue={inputValue} setInputValue={setInputValue} />
            <div className="flex flex-col w-1/5 ">
              <label htmlFor="inputPW">PW</label>
              <input
                id="inputPW"
                className="p-2 border border-gray-400 rounded"
                type="text"
                placeholder="50"
              />
            </div>
          </div>
          {inputValue && (
            <Autocomplete
              users={users}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}
        </div>
      </div>
      <div className="mb-10">
        <Button
          content="Log out"
          action={{ type: DO_FUNCTION, payload: logout }}
        />
      </div>
    </div>
  )
}

export default Main
