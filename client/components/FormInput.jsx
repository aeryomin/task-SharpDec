/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'

const FormInput = (props) => {
  console.log(props.action)
  const [value, setValue] = useState('')
  // const dispatch = useDispatch()

  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="input"
    >
      Username
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="input"
        type="text"
        placeholder="Username"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          // dispatch(action(value))
        }}
      />
    </label>
  )
}

export default FormInput
