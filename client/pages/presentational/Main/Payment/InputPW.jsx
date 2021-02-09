import React from 'react'

const InputPW = (props) => {
  const { value, setValue } = props

  return (
    <div className="flex flex-col w-1/5">
      <label htmlFor="inputPW">PW</label>
      <input
        id="inputPW"
        className="p-2 border border-gray-400 rounded"
        type="text"
        placeholder="0"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
      />
    </div>
  )
}

export default InputPW
