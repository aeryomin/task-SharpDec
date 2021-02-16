import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDateFilter } from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const Filtering = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [dateValue, setDateValue] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="w-2/3">
      <div className="my-2">Filtering:</div>
      <div className="flex ml-4 text-sm">
        <div className="">
          <input
            id="checkbox"
            type="checkbox"
            checked={isChecked}
            value="date"
            onChange={() => {
              console.log(isChecked)
              if (isChecked) {
                dispatch(setDateFilter(null))
                setDateValue('')
              }
              setIsChecked(!isChecked)
            }}
          />
          <label htmlFor="checkbox" className="ml-2">
            By date
          </label>
        </div>
        {isChecked && (
          <div className="w-1/2 md:w-1/3 lg:w-1/3 ml-1">
            <input
              className="w-full border border-gray-300 rounded px-1"
              type="text"
              placeholder="15:02:2021"
              value={dateValue}
              onChange={(event) => {
                setDateValue(event.target.value)
                dispatch(setDateFilter(event.target.value))
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Filtering
