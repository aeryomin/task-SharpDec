import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    transactionToken: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

accountSchema.method({
  passwordMatches(password) {
    // console.log(bcrypt.hashSync(password), this.password)
    return bcrypt.compareSync(password, this.password)
  }
})

accountSchema.statics = {
  async findAndValidateAccount({ email, password }) {
    if (!email) {
      throw new Error('No Email')
    }
    if (!password) {
      throw new Error('No Password')
    }

    const account = await this.findOne({ email }).exec()
    if (!account) {
      throw new Error('No Account')
    }

    const isPasswordOk = await account.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('Password Incorrect')
    }

    return account
  }
}

export default mongoose.model('accounts', accountSchema)
