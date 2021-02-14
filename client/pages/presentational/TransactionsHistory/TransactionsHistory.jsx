import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setRecipient,
  setAmount
} from '../../../redux/actionCreators/transactionsActionCreator'

const TransactionsHistory = (props) => {
  const {
    users,
    setInputUserValue,
    setInputPWValue
  } = props
  const dispatch = useDispatch()
  const { payments } = useSelector((s) => s.transactions.transactions)
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  )
  const scrollElem = useRef(null)
  const [padding, setPadding] = useState('0')
  const [currentEl, setCurrentEl] = useState()
  const formatDate = (date) => {
    if (String(date).length < 2) {
      return '0'.concat(String(date))
    }
    return date
  }

  function getScrollbarWidth(elem) {
    if (elem.current === document.body) {
      return window.innerWidth - document.documentElement.clientWidth
    }
    if (elem.current !== null) {
      return elem.current.offsetWidth - elem.current.clientWidth
    }
    return '0'
  }

  useEffect(() => {
    if (scrollElem.current !== null) {
      setPadding(getScrollbarWidth(scrollElem))
    }
  }, [currentEl])

  useEffect(() => {
    const handler = (e) => setMatches(e.matches)
    window.matchMedia('(min-width: 768px)').addListener(handler)
  }, [])

  return (
    <div className="h-1/3 w-full md:w-1/2 m-2">
      TransactionsHistory
      <div className="w-full h-full border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <div
          className="w-full "
          style={
            matches ? { paddingRight: `${padding}px` } : { paddingRight: '0px' }
          }
        >
          <div className="flex w-full text-blue-500">
            <div className="w-1/3">Date</div>
            <div className="w-1/5">Name</div>
            <div className="w-1/5">Amount</div>
            <div className="w-1/5">Balance</div>
          </div>
        </div>
        {!!payments && (
          <div
            ref={(el) => {
              setCurrentEl(scrollElem.current)
              scrollElem.current = el
            }}
            className="w-full h-5/6 overflow-y-auto"
          >
            {payments.map((transaction) => {
              return (
                <div key={transaction._id} className="w-full text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setInputUserValue(transaction.recipientUsername)
                      setInputPWValue(transaction.amount)
                      const recipient = users.find(
                        (user) =>
                          user.username === transaction.recipientUsername
                      )
                      if (recipient) {
                        dispatch(
                          setRecipient(recipient._id, recipient.username)
                        )
                        dispatch(setAmount(transaction.amount))
                      }
                    }}
                    className="flex w-full hover:bg-blue-300"
                  >
                    <div className="w-1/3 text-left">
                      {`${new Date(transaction.date).getDate()}:${formatDate(
                        new Date(transaction.date).getMonth() + 1
                      )}:${new Date(
                        transaction.date
                      ).getFullYear()}/${formatDate(
                        new Date(transaction.date).getHours()
                      )}:${formatDate(
                        new Date(transaction.date).getMinutes()
                      )}`}
                    </div>
                    <div className="w-1/5 text-left">
                      {transaction.recipientUsername}
                    </div>
                    <div className="w-1/5 text-left">{transaction.amount}</div>
                    <div className="w-1/5 text-left">{transaction.balance}</div>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsHistory
