import React from 'react'

export const filterUser = (users, inputValue) => {
  return users.filter((user) => user.username.indexOf(inputValue, 0) === 0)
}

const Autocomplete = (props) => {
  const { users, inputValue, setInputValue } = props

  return (
    <div className="w-full flex flex-col divide-y divide-light-blue-400">
      {filterUser(users, inputValue).map((user) => {
        return (
          <button
            key={user._id}
            type="button"
            className="w-4/5 text-left mb-0 px-3 py-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setInputValue(user.username)
            }}
          >
            {user.username}
          </button>
        )
      })}
    </div>
  )
}

export default Autocomplete
