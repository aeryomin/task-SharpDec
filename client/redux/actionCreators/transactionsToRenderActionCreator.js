import { formatDate } from '../../pages/presentational/TransactionsHistory/TransactionRow'

export const SET_TRANSACTIONS_TO_RENDER = 'SET_TRANSACTIONS_TO_RENDER'
export const SET_SORT_FIELD = 'SET_SORT_FIELD'
export const TOGGLE_SORT_DIRECTION = 'TOGGLE_SORT_DIRECTION'
export const SET_DATE_FILTER = 'SET_DATE_FILTER'
export const SET_NAME_FILTER = 'SET_NAME_FILTER'
export const SET_AMOUNT_FILTER = 'SET_AMOUNT_FILTER'

export const sortOptions = {
  field: {
    DATE: 'DATE',
    NAME: 'NAME',
    AMOUNT: 'AMOUNT'
  },
  direction: {
    ASCENDING: 'ASCENDING',
    DESCENDING: 'DESCENDING'
  }
}

export const filterOptions = {
  DATE: null,
  NAME: null,
  AMOUNT: null
}

export const setSortField = (field) => {
  return { type: SET_SORT_FIELD, field }
}

export const toggleSortDirection = () => {
  return { type: TOGGLE_SORT_DIRECTION }
}

export const setDateFilter = (date) => {
  return { type: SET_DATE_FILTER, date }
}

export const setNameFilter = (name) => {
  return { type: SET_NAME_FILTER, name }
}

export const setAmountFilter = (amount) => {
  return { type: SET_AMOUNT_FILTER, amount }
}

export const setTransactionsToRender = () => async (dispatch, getState) => {
  const response = await fetch('/api/v1/transactions/protected/transactions')
  const transactions = await response.json()
  const {
    sortOptions: storeSortOptions,
    filterOptions: storeFilterOptions
  } = getState().transactionsToRender

  let transactionsToRender = []
  transactionsToRender = [...transactions.payments]

  switch (storeSortOptions.field) {
    case sortOptions.field.DATE: {
      transactionsToRender.sort((a, b) => {
        return storeSortOptions.direction === sortOptions.direction.ASCENDING
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      })
      break
    }
    case sortOptions.field.NAME: {
      transactionsToRender.sort((a, b) => {
        return storeSortOptions.direction === sortOptions.direction.ASCENDING
          ? a.recipientUsername.localeCompare(b.recipientUsername)
          : b.recipientUsername.localeCompare(a.recipientUsername)
      })
      break
    }
    case sortOptions.field.AMOUNT: {
      transactionsToRender.sort((a, b) => {
        return storeSortOptions.direction === sortOptions.direction.ASCENDING
          ? b.amount - a.amount
          : a.amount - b.amount
      })
      break
    }
    default:
      return ''
  }

  if (storeFilterOptions.date) {
    transactionsToRender = transactionsToRender.filter((tranaction) => {
      const transDate = new Date(tranaction.date)
      const transDateArr = []
      transDateArr.push(formatDate(transDate.getDate()))
      transDateArr.push(formatDate(transDate.getMonth() + 1))
      transDateArr.push(transDate.getFullYear())
      const transDateStr = transDateArr.join(':')

      return storeFilterOptions.date === transDateStr
    })
  }

  if (storeFilterOptions.name) {
    transactionsToRender = transactionsToRender.filter((tranaction) => {
      return storeFilterOptions.name === tranaction.recipientUsername
    })
  }

  if (storeFilterOptions.amount) {
    transactionsToRender = transactionsToRender.filter((tranaction) => {
      return Number(storeFilterOptions.amount) === Number(tranaction.amount)
    })
  }

  dispatch({ type: SET_TRANSACTIONS_TO_RENDER, transactionsToRender })
  return ''
}
