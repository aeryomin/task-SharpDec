import {
  accountDataServices,
  transactionsServices
} from '../services/db'

export async function getUsers(req, res) {
  try {
    const users = await transactionsServices.findUsers()
    res.json(users)
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function createTransaction(req, res) {
  try {
    const account = await accountDataServices.findAccoutById(req.account.uid)

    if (account === null) {
      throw new Error('Account not found')
    }

    let accountTransactions = await transactionsServices.findTransaction(
      account.transactionToken
    )
    const recipient = await accountDataServices.findAccoutById(
      req.body.recipientId
    )
    const recipientTransactions = await transactionsServices.findTransaction(
      recipient.transactionToken
    )

    if (Number(req.body.amount) < Number(accountTransactions.currentBalance)) {
      const newRecipientBalance =
        Number(recipientTransactions.currentBalance) + Number(req.body.amount)

      const newAccountBalance =
        Number(accountTransactions.currentBalance) - Number(req.body.amount)

      await transactionsServices.updateTransaction(
        recipientTransactions.transactionToken,
        newRecipientBalance,
        recipient._id,
        recipient.username,
        req.body.amount
      )

      await transactionsServices.updateTransaction(
        accountTransactions.transactionToken,
        newAccountBalance,
        recipient._id,
        recipient.username,
        req.body.amount
      )

      accountTransactions = await transactionsServices.findTransaction(
        account.transactionToken
      )
    } else {
      res.status(400).send('Balance exceeded')
    }

    res.json(accountTransactions)
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).send('Unauthorized Error')
    }
    if (err.kind === 'ObjectId') {
      res.status(400).send('User not found')
    }
    if (err.message === 'Account not found') {
      res.status(401).send('Invalid user')
    }
    res.json({ status: 'error', err })
  }
}

export async function getUserTransactionsList(req, res) {
  try {
    const account = await accountDataServices.findAccoutById(req.account.uid)

    if (account === null) {
      throw new Error('Account not found')
    }

    const accountTransactions = await transactionsServices.findTransaction(
      account.transactionToken
    )

    res.json(accountTransactions)
  } catch (err) {
    if (err.message === 'Account not found') {
      res.status(401).send('Invalid user')
    }
    res.json({ status: 'error', err })
  }
}
