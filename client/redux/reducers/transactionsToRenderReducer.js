import {
  SET_SORT_OPTIONS,
  sortOptions
} from '../actionCreators/transactionsToRenderActionCreator'

const initialState = {
  sortOption: sortOptions.ASCRENDING,
  transactionsToRender: []
}

const transactionsToRenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_OPTIONS: {
      return { ...state, sortOption: action.sortOptions }
    }
    default:
      return state
  }
}

export default transactionsToRenderReducer
