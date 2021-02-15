import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setSortField,
  toggleSortDirection,
  sortOptions
} from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const SortInput = (props) => {
  const { inputOptions, onChange, selectedOption, content } = props
  return (
    <div className="radio">
      <input
        type="radio"
        id={`id-${inputOptions}`}
        value={inputOptions}
        checked={selectedOption === inputOptions}
        onChange={onChange}
      />
      <label htmlFor={`id-${inputOptions}`} className="ml-2">
        {content}
      </label>
    </div>
  )
}

const Sorting = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState('date')
  const inputOptions = {
    transactionDate: 'date',
    recipientName: 'name',
    transactionAmount: 'amount'
  }
  const onChange = (event) => {
    setSelectedOption(event.target.value)
  }
  useEffect(() => {
    switch (selectedOption) {
      case inputOptions.transactionDate: {
        dispatch(setSortField(sortOptions.field.DATE))
        break
      }
      case inputOptions.recipientName: {
        dispatch(setSortField(sortOptions.field.NAME))
        break
      }
      case inputOptions.transactionAmount: {
        dispatch(setSortField(sortOptions.field.AMOUNT))
        break
      }
      default:
        return ''
    }

    return null
  }, [selectedOption])

  return (
    <div className="w-1/3">
      <div className="my-2">Sorting by:</div>
      <div className="flex flex-col ml-4  text-sm">
        <SortInput
          content="Date"
          inputOptions={inputOptions.transactionDate}
          selectedOption={selectedOption}
          onChange={onChange}
        />
        <SortInput
          content="Name"
          inputOptions={inputOptions.recipientName}
          selectedOption={selectedOption}
          onChange={onChange}
        />
        <SortInput
          content="Amount"
          inputOptions={inputOptions.transactionAmount}
          selectedOption={selectedOption}
          onChange={onChange}
        />
        <div className="mt-2">
          <input
            id="checkbox"
            type="checkbox"
            onChange={() => {
              dispatch(toggleSortDirection())
            }}
          />
          <label htmlFor="checkbox" className="ml-2">
            Change sorting direction
          </label>
        </div>
      </div>
    </div>
  )
}

export default Sorting
