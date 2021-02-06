import passportJWT from 'passport-jwt'
import Account from '../model/Account.model'
import config from '../config'

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  Account.findById(jwtPayload.uid, (err, account) => {
    if (err) {
      return done(err, null)
    }

    if (account) {
      return done(null, account)
    }

    return done(null, false)
  })
})

exports.jwt = jwtStrategy
