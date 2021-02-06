import React from 'react'
import { useDispatch } from 'react-redux'

const Button = (props) => {
  const { content, action } = props
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => {
          dispatch(action())
        }}
      >
        {content}
      </button>
    </div>
  )
}

export default Button
