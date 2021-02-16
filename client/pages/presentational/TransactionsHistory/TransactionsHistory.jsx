import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TransactionRow from './TransactionRow'
import Sorting from './Sorting'
import Filtering from './Filtering'
import { setTransactionsToRender } from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const TransactionsHistory = (props) => {
  const dispatch = useDispatch()
  const { users, setInputUserValue, setInputPWValue } = props
  const { payments } = useSelector((s) => s.transactions.transactions)
  const {
    sortOptions: storeSortOptions,
    filterOptions: storeFilterOptions,
    transactionsToRender
  } = useSelector((s) => s.transactionsToRender)
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  )
  const scrollElem = useRef(null)
  const [padding, setPadding] = useState('0')
  const [currentEl, setCurrentEl] = useState()

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
    window.matchMedia('(min-width: 1024px)').addListener(handler)
  }, [])

  useEffect(() => {
    dispatch(setTransactionsToRender())
  }, [storeSortOptions, storeFilterOptions, payments])

  return (
    <div className="h-1/3 w-full m-2 mr-5 lg:mx-0 lg:m-2 lg:w-1/2">
      TransactionsHistory
      <div className="w-full h-full border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <div
          className="w-full h-8"
          style={
            matches ? { paddingRight: `${padding}px` } : { paddingRight: '0px' }
          }
        >
          <div className="flex w-full h-full text-blue-500">
            <div className="w-1/3 h-full flex text-sm">Date</div>
            <div className="w-1/4 flex text-sm">Name</div>
            <div className="w-1/4 text-sm">Amount</div>
            <div className="w-1/6 text-sm">Balance</div>
          </div>
        </div>
        {!!transactionsToRender && (
          <div
            ref={(el) => {
              setCurrentEl(scrollElem.current)
              scrollElem.current = el
            }}
            className="w-full h-5/6 overflow-y-auto"
          >
            {transactionsToRender.map((transaction) => {
              return (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                  setInputUserValue={setInputUserValue}
                  setInputPWValue={setInputPWValue}
                  users={users}
                />
              )
            })}
          </div>
        )}
      </div>
      <div className="flex">
        <Sorting />
        <Filtering />
      </div>
    </div>
  )
}

export default TransactionsHistory
