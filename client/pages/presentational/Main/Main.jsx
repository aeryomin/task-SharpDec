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
import TransactionsHistory from '../TransactionsHistory/TransactionsHistory'

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
      <div className="flex flex-col md:flex-row md:justify-between h-2/3 md:h-1/2">
        <Payment users={users} />
        <TransactionsHistory />
      </div>
      <div className="border border-gray-300 h-auto">
        <Button
          content="Log out"
          action={{ type: DO_FUNCTION, payload: logout }}
        />
      </div>
    </div>
  )
}

export default Main
