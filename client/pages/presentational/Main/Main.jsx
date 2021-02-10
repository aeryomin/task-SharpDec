import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import Header from '../../../components/Header'
import {
  getUsers,
  getTransactions
} from '../../../redux/actionCreators/transactionsActionCreator'
import Payment from './Payment/Payment'
import Button, { DO_FUNCTION } from '../../../components/Button'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
}

const Main = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((s) => s.transactions)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTransactions())
  }, [])

  return (
    <div className="h-screen flex flex-col justify-start">
      <Header />
      <div className="flex h-full m-3">
        <Payment users={users} />
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
