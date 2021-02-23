import { nanoid } from 'nanoid'
import { loginServices, regServices, accountDataServices } from '../services/db'

import config from '../config'
import { STARTING_BALANCE } from '../../client/constants/main'

export async function registration(req, res) {
  if (
    (!req.body.username && !req.body.password) ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).send('You must send username and password')
  }

  const account = await regServices.findAccount(req.body.email)

  if (account !== null) {
    res.status(400).send('A user with that email already exists')
  }

  const transactionToken = nanoid()

  const newAccount = regServices.createAccountInstance(
    req.body.username,
    req.body.email,
    req.body.password,
    transactionToken
  )

  regServices.createTransactionInstance(transactionToken, STARTING_BALANCE)

  const payload = { uid: newAccount.id }
  const token = regServices.createToken(payload, config.secret)

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
    const account = await loginServices.validateAccount(req.body)
    const payload = { uid: account.id }
    const token = regServices.createToken(payload, config.secret)
    delete account.password

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ token, user: account })
  } catch (err) {
    res.status(401).send('Invalid email or password')
  }
}

export async function getAccountData(req, res) {
  try {
    // const jwtAccount = accountDataServices.verifyAccount(
    //   req.cookies.token,
    //   config.secret
    // )
    const account = await accountDataServices.findAccoutById(req.account.uid)
    const payload = { uid: account.id }
    const token = regServices.createToken(payload, config.secret)

    delete account.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.send({ token, user: account })
  } catch (err) {
    res.json({ status: 'error', err })
  }
}
