/* eslint-disable no-console */
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import Account from '../model/Account.model'
import config from '../config'
import { STARTING_BALANCE } from '../../client/constants/main'

export async function registration(req, res) {
  const account = await Account.findOne({ email: req.body.email })

  if (account !== null) {
    res.status(400).send('A user with that email already exists')
  }

  if (
    (!req.body.username && !req.body.password) ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).send('You must send username and password')
  }

  const newAccount = new Account({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    balance: STARTING_BALANCE,
    transToken: nanoid()
  })
  newAccount.save()
  const payload = { uid: newAccount.id }
  const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
  delete newAccount.password
  res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
  res.send({ token, user: newAccount })
}

export async function login(req, res) {
  if (
    (!req.body.email && !req.body.password) ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send('You must send email and password')
  }

  try {
    const account = await Account.findAndValidateAccount(req.body)

    const payload = { uid: account.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete account.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ token, user: account })
  } catch (err) {
    res.status(401).send('Invalid email or password')
  }
}

export async function getAccountData(req, res) {
  try {
    // console.log('-->> req: ', req.cookies)

    const jwtAccount = jwt.verify(req.cookies.token, config.secret)
    const account = await Account.findById(jwtAccount.uid)

    const payload = { uid: account.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete account.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ token, user: account })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
