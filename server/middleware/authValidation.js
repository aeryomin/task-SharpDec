import config from '../config'
import { accountDataServices } from '../services/db'

const authValidation = (req, res, next) => {
  try {
    const account = accountDataServices.verifyAccount(
      req.cookies.token,
      config.secret
    )
    req.account = account
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      res.status(401).send('Unauthorized Error')
    }
    res.json({ status: 'error', err })
  }
}

export default authValidation
