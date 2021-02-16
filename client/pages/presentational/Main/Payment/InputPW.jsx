import React from 'react'
import { useDispatch } from 'react-redux'
import { setAmount } from '../../../../redux/actionCreators/transactionsActionCreator'

const InputPW = (props) => {
  const { value, setValue } = props
  const dispatch = useDispatch()

  return (
    <div className="w-1/5">
      <label className="text-sm" htmlFor="inputPW">
        Amount
      </label>
      <input
        id="inputPW"
        className="w-full p-2 border border-gray-400 rounded text-sm"
        type="text"
        placeholder="0"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          dispatch(setAmount(event.target.value))
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            dispatch(setAmount(value))
          }
        }}
      />
    </div>
  )
}

export default InputPW
