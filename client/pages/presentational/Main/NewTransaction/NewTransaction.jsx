import React from 'react'
import InputUser from './InputUser'
import Autocomplete from './Autocomplete'

const NewTransaction = (props) => {
  const { users, inputValue, setInputValue } = props

  return (
    <div className="border border-gray-200 rounded w-1/2 h-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
      <div className="flex">
        <InputUser inputValue={inputValue} setInputValue={setInputValue} />
        <div className="flex flex-col w-1/5">
          <label htmlFor="inputPW">PW</label>
          <input
            id="inputPW"
            className="p-2 border border-gray-400 rounded"
            type="text"
            placeholder="50"
          />
        </div>
      </div>
      {inputValue && (
        <Autocomplete
          users={users}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </div>
  )
}

export default NewTransaction
