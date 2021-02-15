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
    dispatch(toggleSortDirection())
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
        {/* <div className="radio">
          <input
            type="radio"
            id={`id-${inputOptions.transactionDate}`}
            value={inputOptions.transactionDate}
            checked={selectedOption === inputOptions.transactionDate}
            onChange={onChange}
          />
          <label
            htmlFor={`id-${inputOptions.transactionDate}`}
            className="ml-2"
          >
            Date
          </label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id={`id-${inputOptions.recipientName}`}
            value={inputOptions.recipientName}
            checked={selectedOption === inputOptions.recipientName}
            onChange={onChange}
          />
          <label htmlFor={`id-${inputOptions.recipientName}`} className="ml-2">
            Name
          </label>
        </div>
        <div className="radio">
          <input
            type="radio"
            id={`id-${inputOptions.transactionAmount}`}
            value={inputOptions.transactionAmount}
            checked={selectedOption === inputOptions.transactionAmount}
            onChange={onChange}
          />
          <label
            htmlFor={`id-${inputOptions.transactionAmount}`}
            className="ml-2"
          >
            Amount
          </label>
        </div> */}
      </div>
    </div>
  )
}

export default Sorting
