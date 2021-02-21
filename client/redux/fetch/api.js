import axios from 'axios'

const ACCOUNT = {
  POST: {
    LOGIN: '/api/v1/auth',
    REGISTRATION: '/api/v1/auth/registration'
  },
  GET: {
    TRY_LOGIN: '/api/v1/auth'
  }
}

const TRANSACTIONS = {
  POST: {
    SUBMIT_PAYMENT: '/api/v1/transactions/protected/transactions'
  },
  GET: {
    GET_USERS: '/api/v1/transactions/protected/users/list',
    GET_TRANSACTIONS: '/api/v1/transactions/protected/transactions'
  }
}

const errorsHandler = (err) => {
  if (err.response) {
    // eslint-disable-next-line no-console
    console.log('err.response', err.response.data)
  } else if (err.request) {
    // eslint-disable-next-line no-console
    console.log('err.request', err.request)
  }
  return err
}

export default {
  loginFetch: async (email, password) => {
    try {
      const response = await axios.post(ACCOUNT.POST.LOGIN, { email, password })
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  tryLogInFetch: async () => {
    try {
      const response = await axios(ACCOUNT.GET.TRY_LOGIN)
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  registrationFetch: async (username, email, password) => {
    try {
      const response = await axios.post(ACCOUNT.POST.REGISTRATION, {
        username,
        email,
        password
      })
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  getUsersFetch: async () => {
    try {
      const response = await axios(TRANSACTIONS.GET.GET_USERS)
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  getTransactionsFetch: async () => {
    try {
      const response = await axios(TRANSACTIONS.GET.GET_TRANSACTIONS)
      return response.data
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  },
  submitPaymentFetch: async (recipientId, amount, transactionToken) => {
    try {
      await axios.post(
        TRANSACTIONS.POST.SUBMIT_PAYMENT,
        {
          recipientId,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${transactionToken}`
          }
        }
      )
      return ''
    } catch (err) {
      errorsHandler(err)
    }
    return ''
  }
}
