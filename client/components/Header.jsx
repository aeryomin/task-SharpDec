import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const { username } = useSelector((s) => s.account.user)
  const { currentBalance } = useSelector((s) => s.transactions.transactions)

  return (
    <div className="w-full md:mx-auto h-12 pr-2 flex justify-around items-center bg-blue-400 text-gray-100">
      <div>{username}</div>
      <div>Balance: {currentBalance}</div>
    </div>
  )
}

export default Header
