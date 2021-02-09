import React from 'react'

const InputUser = (props) => {
  const { inputValue, setInputValue } = props

  return (
    <div className="">
      <label htmlFor="userInput">Username:</label>
      <input
        className="border border-gray-400 rounded w-full p-2"
        id="userInput"
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value)
        }}
      />
    </div>
  )
}

export default InputUser
