import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setRecipient,
  setAmount
} from '../../../redux/actionCreators/transactionsActionCreator'

export const formatDate = (date) => {
  if (String(date).length < 2) {
    return '0'.concat(String(date))
  }
  return date
}

const TransactionRow = (props) => {
  const { users, transaction, setInputUserValue, setInputPWValue } = props
  const dispatch = useDispatch()
  const { username } = useSelector((s) => s.account.user)
  const isCredit =
    transaction.recipientUsername === username ? 'text-green-500' : ''

  return (
    <div className={`w-full text-xs ${isCredit}`}>
      <button
        type="button"
        onClick={() => {
          setInputUserValue(transaction.recipientUsername)
          setInputPWValue(transaction.amount)
          const recipient = users.find(
            (user) => user.username === transaction.recipientUsername
          )
          if (recipient) {
            dispatch(setRecipient(recipient._id, recipient.username))
            dispatch(setAmount(transaction.amount))
          }
        }}
        className="flex w-full hover:bg-blue-300"
      >
        <div className="w-2/5 text-left overflow-x-auto">
          {`${formatDate(new Date(transaction.date).getDate())}:${formatDate(
            new Date(transaction.date).getMonth() + 1
          )}:${new Date(transaction.date).getFullYear()}/${formatDate(
            new Date(transaction.date).getHours()
          )}:${formatDate(new Date(transaction.date).getMinutes())}`}
        </div>
        <div className="w-1/4 text-left overflow-x-auto">{transaction.recipientUsername}</div>
        <div className="w-1/4 text-left overflow-x-auto">{transaction.amount}</div>
        <div className="w-1/6 text-left overflow-x-auto">{transaction.balance}</div>
      </button>
    </div>
  )
}

export default TransactionRow
