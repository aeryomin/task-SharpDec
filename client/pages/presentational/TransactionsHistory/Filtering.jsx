import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setDateFilter,
  setNameFilter,
  setAmountFilter
} from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const FilterField = (props) => {
  const { labelContent, placeholder, setFilter } = props
  const [isChecked, setIsChecked] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="flex ml-4 text-sm mb-2">
      <div className="h-5">
        <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          value="date"
          onChange={() => {
            if (isChecked) {
              setValue('')
              dispatch(setFilter(null))
            }
            setIsChecked(!isChecked)
          }}
        />
        <label htmlFor="checkbox" className="ml-2">
          {labelContent}
        </label>
      </div>
      {isChecked && (
        <div className="w-1/2 lg:w-1/3 ml-1">
          <input
            className="w-full h-5 border border-gray-300 rounded px-1"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              dispatch(setFilter(event.target.value))
            }}
          />
        </div>
      )}
    </div>
  )
}

const Filtering = () => {
  return (
    <div className="w-2/3">
      <div className="my-2 lg:mt-8">Filtering by:</div>
      <FilterField
        labelContent="Date"
        setFilter={setDateFilter}
        placeholder="15:02:2021"
      />
      <FilterField
        labelContent="Name"
        setFilter={setNameFilter}
        placeholder="John Doe"
      />
      <FilterField
        labelContent="Amount"
        setFilter={setAmountFilter}
        placeholder="100"
      />
    </div>
  )
}

export default Filtering
