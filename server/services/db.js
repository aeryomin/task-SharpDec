import jwt from 'jsonwebtoken'
import Account from '../model/Account.model'
import Transactions from '../model/Transactions.model'

export const loginServices = {
  validateAccount: async (credentials) => {
    const account = await Account.findAndValidateAccount(credentials)
    return account
  }
}

export const regServices = {
  findAccount: async (email) => {
    const account = await Account.findOne({ email })
    return account
  },
  createAccountInstance: (username, email, password, transactionToken) => {
    const newAccount = new Account({
      username,
      email,
      password,
      transactionToken
    })
    newAccount.save()

    return newAccount
  },
  createTransactionInstance: (transactionToken, currentBalance) => {
    const newTransaction = new Transactions({
      transactionToken,
      currentBalance
    })
    newTransaction.save()

    return newTransaction
  },
  createToken: (payload, secret) => {
    const token = jwt.sign(payload, secret, { expiresIn: '48h' })
    return token
  }
}

export const accountDataServices = {
  verifyAccount: (token, secret) => {
    const jwtAccount = jwt.verify(token, secret)
    return jwtAccount
  },
  findAccoutById: async (id) => {
    const account = await Account.findById(id)
    return account
  }
}

export const transactionsServices = {
  findUsers: async () => {
    const users = await Account.find({})
    return users
  },
  findTransaction: async (token) => {
    const transaction = await Transactions.findOne({
      transactionToken: token
    })
    return transaction
  },
  updateTransaction: async (token, balance, id, username, amount) => {
    const updatedTransaction = await Transactions.updateOne(
      { transactionToken: token },
      {
        $set: { currentBalance: balance },
        $push: {
          payments: {
            recipientId: id,
            date: new Date(),
            recipientUsername: username,
            amount,
            balance
          }
        }
      },
      { upsert: false }
    )
    return updatedTransaction
  }
}
