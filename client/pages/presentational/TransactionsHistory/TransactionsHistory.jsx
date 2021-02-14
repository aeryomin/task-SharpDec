import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const TransactionsHistory = () => {
  const { payments } = useSelector((s) => s.transactions.transactions)
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  )
  const scrollElem = useRef(null)
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
    return elem.current.offsetWidth - elem.current.clientWidth
  }
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
            matches
              ? { paddingRight: `${getScrollbarWidth(scrollElem)}px` }
              : { paddingRight: '0px' }
          }
        >
          <table className="w-full table-fixed border-collapse">
            <tbody className="text-sm text-blue-700">
              <td className="w-1/3">Date</td>
              <td>Name</td>
              <td>Amount</td>
              <td>Balance</td>
            </tbody>
          </table>
        </div>
        {!!payments && (
          <div ref={scrollElem} className="w-full h-5/6 overflow-y-auto">
            <table className="w-full table-fixed border-collapse">
              <tbody className="">
                {payments.map((transaction) => {
                  return (
                    <tr className="text-xs" key={transaction._id}>
                      <td className="w-1/3">{`${new Date(
                        transaction.date
                      ).getDate()}:${formatDate(
                        new Date(transaction.date).getMonth() + 1
                      )}:${new Date(
                        transaction.date
                      ).getFullYear()}/${formatDate(
                        new Date(transaction.date).getHours()
                      )}:${formatDate(
                        new Date(transaction.date).getMinutes()
                      )}`}</td>
                      <td>{transaction.recipientUsername}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.balance}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsHistory
