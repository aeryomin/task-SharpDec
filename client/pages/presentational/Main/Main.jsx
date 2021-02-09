import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../../components/Header'
import { getUsers } from '../../../redux/actionCreators/transactionsActionCreator'
import NewTransaction from './NewTransaction/NewTransaction'
import { filterUser } from './NewTransaction/Autocomplete'
import Button, { DO_FUNCTION } from '../../../components/Button'

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
      <div className="flex h-full m-3">
        <NewTransaction
          users={users}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
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
