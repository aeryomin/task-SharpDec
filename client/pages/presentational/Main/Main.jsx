import React, { useState, useEffect } from 'react'
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
import { getSocket } from '../../../redux'

const logout = () => {
  new Cookies().remove('token')
  window.location.reload()
}

const Main = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.account)
  const { users } = useSelector((s) => s.transactions)
  const { doUpdate } = useSelector((s) => s.socket)
  const [inputUserValue, setInputUserValue] = useState('')
  const [inputPWValue, setInputPWValue] = useState('')

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTransactions())
    getSocket().emit('message', { userId: user._id })
  }, [])

  useEffect(() => {
    getSocket().on('message', (msg) => {
      if (msg.type) {
        switch (msg.type) {
          case 'ADD_REQUEST_TO_UPDATE_TRANSACTIONS': {
            dispatch(msg)
            break
          }
          default:
            return ''
        }
      }
      return ''
    })
  }, [])

  useEffect(() => {
    dispatch(getTransactions())
  }, [doUpdate])

  return (
    <div className="h-screen w-screen flex flex-col justify-start overflow-hidden">
      <Header />
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between h-5/6 lg:h-1/2">
        <Payment
          users={users}
          inputUserValue={inputUserValue}
          setInputUserValue={setInputUserValue}
          inputPWValue={inputPWValue}
          setInputPWValue={setInputPWValue}
        />
        <TransactionsHistory
          users={users}
          setInputUserValue={setInputUserValue}
          setInputPWValue={setInputPWValue}
        />
      </div>
      <div className="">
        <Button
          content="Logout"
          action={{ type: DO_FUNCTION, payload: logout }}
        />
      </div>
    </div>
  )
}

export default Main
