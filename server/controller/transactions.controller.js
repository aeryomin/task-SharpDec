import jwt from 'jsonwebtoken'
import Account from '../model/Account.model'
import config from '../config'

export async function getUsers(req, res) {
  try {
    const jwtAccount = jwt.verify(req.cookies.token, config.secret)
    const account = await Account.findById(jwtAccount.uid)
    const payload = { uid: account.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete account.password
    const users = await Account.find({})

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ token, user: account })
    res.json(users)
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
    const users = await Account.find({})
    res.json(users)
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function createTransaction(req, res) {
  try {
    const users = await Account.find({})
    res.json(users)
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
