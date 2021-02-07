import React from 'react'
import store, { history } from '../redux'

export const DO_FUNCTION = 'DO_FUNCTION'
export const DO_DISPATCH = 'DO_DISPATCH'
export const FOLLOW_TO_LINK = 'FOLLOW_TO_LINK'

const switchAction = (action) => {
  switch (action.type) {
    case DO_FUNCTION: {
      action.payload()
      break
    }
    case DO_DISPATCH: {
      store.dispatch(action.payload())
      break
    }
    case FOLLOW_TO_LINK: {
      history.push(action.payload)
      break
    }
    default:
      break
  }
}

const Button = (props) => {
  const { content, action } = props

  return (
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => {
          switchAction(action)
        }}
      >
        {content}
      </button>
    </div>
  )
}

export default Button
