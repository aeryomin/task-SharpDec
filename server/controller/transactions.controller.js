/* eslint-disable no-console */
import jwt from 'jsonwebtoken'
import Account from '../model/Account.model'
import Transactions from '../model/Transactions.model'
import config from '../config'

export async function getUsers(req, res) {
  try {
    jwt.verify(req.cookies.token, config.secret)
    const users = await Account.find({})
    res.json(users)
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function createTransaction(req, res) {
  // console.log('req.body: ', req.body)

  try {
    const jwtAccount = jwt.verify(req.cookies.token, config.secret)

    const account = await Account.findById(jwtAccount.uid)
    // console.log('account: ', account)
    if (account === null) {
      throw new Error('Account not found')
    }

    let accountTransactions = await Transactions.findOne({
      transactionToken: account.transactionToken
    })
    // console.log('accountTransactions: ', accountTransactions)

    const recipient = await Account.findById(req.body.recipientId)
    // console.log('recipient: ', recipient)

    const recipientTransactions = await Transactions.findOne({
      transactionToken: recipient.transactionToken
    })

    if (Number(req.body.amount) < Number(accountTransactions.currentBalance)) {
      const newRecipientBalance =
        Number(recipientTransactions.currentBalance) + Number(req.body.amount)

      const newAccountBalance =
        Number(accountTransactions.currentBalance) - Number(req.body.amount)

      await Transactions.updateOne(
        { transactionToken: recipientTransactions.transactionToken },
        { $set: { currentBalance: newRecipientBalance } },
        { upsert: false }
      )
      await Transactions.updateOne(
        { transactionToken: accountTransactions.transactionToken },
        {
          $set: { currentBalance: newAccountBalance },
          $push: {
            payments: {
              recipientId: recipient._id,
              date: new Date(),
              recipientUsername: recipient.username,
              amount: req.body.amount,
              balance: newAccountBalance
            }
          }
        },
        { upsert: false }
      )

      accountTransactions = await Transactions.findOne({
        transactionToken: account.transactionToken
      })
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
    const jwtAccount = jwt.verify(req.cookies.token, config.secret)
    const account = await Account.findById(jwtAccount.uid)
    if (account === null) {
      throw new Error('Account not found')
    }
    const accountTransactions = await Transactions.findOne({
      transactionToken: account.transactionToken
    })
    res.json(accountTransactions)
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).send('Unauthorized Error')
    }
    if (err.message === 'Account not found') {
      res.status(401).send('Invalid user')
    }
    res.json({ status: 'error', err })
  }
}
