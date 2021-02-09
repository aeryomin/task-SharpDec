import React from 'react'
import { useDispatch } from 'react-redux'
import { setRecipient } from '../../../../redux/actionCreators/transactionsActionCreator'

export const filterUser = (users, inputValue) => {
  return users.filter((user) => user.username.indexOf(inputValue, 0) === 0)
}

const Autocomplete = (props) => {
  const { users, value, setValue } = props
  const dispatch = useDispatch()

  return (
    <div className="w-4/5 flex flex-col divide-y divide-light-blue-400">
      {filterUser(users, value).map((user) => {
        return (
          <button
            key={user._id}
            type="button"
            className="w-full mr-2 text-left mb-0 px-3 py-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setValue(user.username)
              dispatch(setRecipient(user._id, user.username))
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
