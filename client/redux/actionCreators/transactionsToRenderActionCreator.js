export const SET_SORT_OPTIONS = 'SET_SORT_OPTIONS'

export const sortOptions = {
  ASCRENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
}

export const setSortOptions = (sortOption) => {
  return { type: SET_SORT_OPTIONS, sortOption }
}
