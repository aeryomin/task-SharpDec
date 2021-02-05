import React from 'react'

const Button = (props) => {
  const { content } = props
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        {content}
      </button>
    </div>
  )
}

export default Button
