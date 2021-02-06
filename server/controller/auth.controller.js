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

    res.send({ status: 'ok', token })
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
