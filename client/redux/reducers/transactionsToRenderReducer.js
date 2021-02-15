import {
  TOGGLE_DATE_SORT_OPTIONS,
  TOGGLE_NAME_SORT_OPTIONS,
  SET_TRANSACTIONS_TO_RENDER,
  sortOptions
} from '../actionCreators/transactionsToRenderActionCreator'

const initialState = {
  sortOption: {
    date: sortOptions.date.ASCENDING,
    name: sortOptions.name.ASCENDING
  },
  transactionsToRender: []
}

const transactionsToRenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DATE_SORT_OPTIONS: {
      return {
        ...state,
        sortOption: {
          ...state.sortOption,
          date:
            state.sortOption.date === sortOptions.date.ASCENDING
              ? sortOptions.date.DESCENDING
              : sortOptions.date.ASCENDING
        }
      }
    }
    case TOGGLE_NAME_SORT_OPTIONS: {
      return {
        ...state,
        sortOption: {
          ...state.sortOption,
          name:
            state.sortOption.name === sortOptions.name.ASCENDING
              ? sortOptions.name.DESCENDING
              : sortOptions.name.ASCENDING
        }
      }
    }
    case SET_TRANSACTIONS_TO_RENDER: {
      // console.log('action.transactionsToRender', action.transactionsToRender)
      return { ...state, transactionsToRender: action.transactionsToRender }
    }
    default:
      return state
  }
}

export default transactionsToRenderReducer
