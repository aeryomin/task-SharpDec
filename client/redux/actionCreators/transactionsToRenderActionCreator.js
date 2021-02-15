// import store from '..'

export const TOGGLE_DATE_SORT_OPTIONS = 'TOGGLE_DATE_SORT_OPTIONS'
export const TOGGLE_NAME_SORT_OPTIONS = 'TOGGLE_NAME_SORT_OPTIONS'
export const SET_TRANSACTIONS_TO_RENDER = 'SET_TRANSACTIONS_TO_RENDER'

export const sortOptions = {
  date: {
    ASCENDING: 'ASCENDING',
    DESCENDING: 'DESCENDING'
  },
  name: {
    ASCENDING: 'ASCENDING',
    DESCENDING: 'DESCENDING'
  }
}

export const toggleDateSortOptions = () => {
  return { type: TOGGLE_DATE_SORT_OPTIONS }
}

export const toggleNameSortOptions = () => {
  return { type: TOGGLE_NAME_SORT_OPTIONS }
}

export const setTransactionsToRender = (sortingOptions) => async (dispatch) => {
  const response = await fetch('/api/v1/transactions/protected/transactions')
  const transactions = await response.json()

  let transactionsToRender = []
  transactionsToRender = [...transactions.payments]

  switch (sortingOptions.date) {
    case sortOptions.date.ASCENDING: {
      transactionsToRender.sort((a, b) => new Date(b.date) - new Date(a.date))
      console.log('do ASCENDING')
      break
    }
    case sortOptions.date.DESCENDING: {
      console.log('do DESCENDING')
      transactionsToRender.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    }
    default:
      return ''
  }
  console.log('transactionsToRender', transactionsToRender)

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
