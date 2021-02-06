/* eslint-disable no-console */
import jwt from 'jsonwebtoken'
import Account from '../model/Account.model'
import config from '../config'

export async function login(req, res) {
  console.log('login func', req.body)

  try {
    const account = await Account.findAndValidateAccount(req.body)
    console.log(account)

    const payload = { uid: account.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete account.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ status: 'ok', token, user: account })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function getAccountData(req, res) {
  try {
    const jwtAccount = jwt.verify(req.cookies.token, config.secret)
    const account = await Account.findById(jwtAccount.uid)

    const payload = { uid: account.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete account.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ status: 'ok', token, user: account })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}

export async function getOne(req, res) {
  try {
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
