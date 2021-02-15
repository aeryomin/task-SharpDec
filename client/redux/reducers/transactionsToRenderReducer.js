import {
  SET_TRANSACTIONS_TO_RENDER,
  SET_SORT_FIELD,
  TOGGLE_SORT_DIRECTION,
  sortOptions
} from '../actionCreators/transactionsToRenderActionCreator'

const initialState = {
  sortOptions: {
    field: sortOptions.field.DATE,
    direction: sortOptions.direction.ASCENDING
  },
  transactionsToRender: []
}

const transactionsToRenderReducer = (state = initialState, action) => {
  switch (action.type) {
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
