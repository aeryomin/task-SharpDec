import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setSortField,
  toggleSortDirection,
  sortOptions
} from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const FilterButton = (props) => {
  const { content, sortOpt } = props
  const dispatch = useDispatch()

  return (
    <button
      type="button"
      className="text-left text-sm hover:bg-blue-300"
      onClick={() => {
        dispatch(setSortField(sortOpt))
        dispatch(toggleSortDirection())
      }}
    >
      {content}
    </button>
  )
}

const Filtering = () => {
  return (
    <div className="w-1/3">
      <div>Sorting:</div>
      <div className="flex flex-col ml-4">
        <FilterButton content="By Date" sortOpt={sortOptions.field.DATE} />
        <FilterButton content="By Name" sortOpt={sortOptions.field.NAME} />
        <FilterButton content="By Amount" sortOpt={sortOptions.field.AMOUNT} />
      </div>
    </div>
  )
}

export default Filtering
