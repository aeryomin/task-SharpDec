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
      unique: false
    },
    password: {
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

export default mongoose.model('accounts', accountSchema)
