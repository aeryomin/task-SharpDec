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
    <div className=" absolute w-2/5 flex flex-col divide-y divide-light-blue-400 text-sm">
      {filterUser(users, value).map((user) => {
        return (
          <button
            key={user._id}
            type="button"
            className="w-full text-left mb-0 px-2 py-2 bg-gray-200 hover:bg-gray-400"
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
