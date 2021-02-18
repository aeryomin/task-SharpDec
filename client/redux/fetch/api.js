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

export default {
  loginFetch: async (email, password) => {
    const response = await axios.post(ACCOUNT.POST.LOGIN, { email, password })
    return response.data
  },
  tryLogInFetch: async () => {
    const response = await axios(ACCOUNT.GET.TRY_LOGIN)
    return response.data
  },
  registrationFetch: async (username, email, password) => {
    const response = await axios.post(ACCOUNT.POST.REGISTRATION, {
      username,
      email,
      password
    })
    return response.data
  },
  getUsersFetch: async () => {
    const response = await axios(TRANSACTIONS.GET.GET_USERS)
    return response.data
  },
  getTransactionsFetch: async () => {
    const response = await axios(TRANSACTIONS.GET.GET_TRANSACTIONS)
    return response.data
  },
  submitPaymentFetch: async (recipientId, amount, transactionToken) => {
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
  }
}
