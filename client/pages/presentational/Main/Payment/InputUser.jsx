import React from 'react'
import { useDispatch } from 'react-redux'
import { setRecipient } from '../../../../redux/actionCreators/transactionsActionCreator'

const InputUser = (props) => {
  const { value, setValue, users } = props
  const dispatch = useDispatch()

  return (
    <div className="mr-2">
      <label className="text-sm" htmlFor="userInput">Username:</label>
      <input
        className="border border-gray-400 rounded w-full p-2"
        id="userInput"
        type="text"
        placeholder="username"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            const recipient = users.find(
              (user) => user.username === event.target.value
            )
            if (recipient) {
              dispatch(setRecipient(recipient._id, recipient.username))
            }
          }
        }}
      />
    </div>
  )
}

export default InputUser
