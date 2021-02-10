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
  console.log('req.body: ', req.body)

  try {
    const jwtAccount = jwt.verify(req.cookies.token, config.secret)

    const account = await Account.findById(jwtAccount.uid)
    console.log('account: ', account)

    const accountTransactions = await Transactions.findOne({
      transactionToken: account.transactionToken
    })
    console.log('accountTransactions: ', accountTransactions)

    const recipient = await Account.findById(req.body.recipientId)
    console.log('recipient: ', recipient)

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
        { $set: { currentBalance: newAccountBalance } },
        { upsert: false }
      )
    } else {
      res.status(400).send('Balance exceeded')
    }

    res.json(accountTransactions)
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

// export async function getAccountData(req, res) {
//   try {
//     const jwtAccount = jwt.verify(req.cookies.token, config.secret)
//     const account = await Account.findById(jwtAccount.uid)

//     const payload = { uid: account.id }
//     const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
//     delete account.password
//     res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
//     res.send({ token, user: account })
//   } catch (err) {
//     res.json({ status: 'error', err })
//   }
// }

export async function getUserTransactionsList(req, res) {
  try {
    res.json()
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
