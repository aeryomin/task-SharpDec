/* eslint-disable no-console */
// import account from '../model/Account.model'

export function login(req, res) {
  try {
    console.log(req.body)
    res.send({ status: 'ok', token: 'new-token' })
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
