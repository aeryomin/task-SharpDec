// import store from '..'

export const SET_TRANSACTIONS_TO_RENDER = 'SET_TRANSACTIONS_TO_RENDER'
export const SET_SORT_FIELD = 'SET_SORT_FIELD'
export const TOGGLE_SORT_DIRECTION = 'TOGGLE_SORT_DIRECTION'

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

export const setSortField = (field) => {
  return { type: SET_SORT_FIELD, field }
}

export const toggleSortDirection = () => {
  return { type: TOGGLE_SORT_DIRECTION }
}

export const setTransactionsToRender = () => async (dispatch, getState) => {
  const response = await fetch('/api/v1/transactions/protected/transactions')
  const transactions = await response.json()
  const { sortOptions: storeSortOptions } = getState().transactionsToRender

  let transactionsToRender = []
  transactionsToRender = [...transactions.payments]
  console.log('transactionsToRender', transactionsToRender)

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

  console.log('after transactionsToRender', transactionsToRender)

  dispatch({ type: SET_TRANSACTIONS_TO_RENDER, transactionsToRender })
  return ''
}

// export const setTransactionsToRender = (sortingOptions) => {
//   const { payments } = store.getState().transactions.transactions
//   let transactionsToRender = []
//   transactionsToRender = [...payments]
//   console.log('transactionsToRender', transactionsToRender)

//   switch (sortingOptions.date) {
//     case sortOptions.date.ASCENDING: {
//       transactionsToRender.sort((a, b) => new Date(a.date) - new Date(b.date))
//       break
//     }
//     case sortOptions.date.DESCENDING: {
//       transactionsToRender.sort((a, b) => new Date(b.date) - new Date(a.date))
//       break
//     }
//     default:
//       return ''
//   }
//   return { type: SET_TRANSACTIONS_TO_RENDER, transactionsToRender }
// }
