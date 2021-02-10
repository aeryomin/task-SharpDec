import mongoose from 'mongoose'

const transactionsSchema = new mongoose.Schema({
  transactions: [Object]
})

export default mongoose.model('transactions', transactionsSchema)
