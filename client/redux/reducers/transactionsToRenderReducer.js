import {
  SET_TRANSACTIONS_TO_RENDER,
  SET_SORT_FIELD,
  TOGGLE_SORT_DIRECTION,
  SET_DATE_FILTER,
  SET_NAME_FILTER,
  SET_AMOUNT_FILTER,
  sortOptions,
  filterOptions
} from '../actionCreators/transactionsToRenderActionCreator'

const initialState = {
  sortOptions: {
    field: sortOptions.field.DATE,
    direction: sortOptions.direction.ASCENDING
  },
  filterOptions: {
    date: filterOptions.DATE,
    name: filterOptions.NAME,
    amount: filterOptions.AMOUNT
  },
  transactionsToRender: []
}

const transactionsToRenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE_FILTER: {
      return {
        ...state,
        filterOptions: { ...state.filterOptions, date: action.date }
      }
    }
    case SET_NAME_FILTER: {
      return {
        ...state,
        filterOptions: { ...state.filterOptions, name: action.name }
      }
    }
    case SET_AMOUNT_FILTER: {
      return {
        ...state,
        filterOptions: { ...state.filterOptions, amount: action.amount }
      }
    }
    case SET_SORT_FIELD: {
      return {
        ...state,
        sortOptions: { ...state.sortOptions, field: action.field }
      }
    }
    case TOGGLE_SORT_DIRECTION: {
      return {
        ...state,
        sortOptions: {
          ...state.sortOptions,
          direction:
            state.sortOptions.direction === sortOptions.direction.ASCENDING
              ? sortOptions.direction.DESCENDING
              : sortOptions.direction.ASCENDING
        }
      }
    }
    case SET_TRANSACTIONS_TO_RENDER: {
      return { ...state, transactionsToRender: action.transactionsToRender }
    }
    default:
      return state
  }
}

export default transactionsToRenderReducer
