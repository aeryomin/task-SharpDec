import mongoose from 'mongoose'

const transactionsSchema = new mongoose.Schema({
  transactionToken: {
    type: String,
    required: true
  },
  currentBalance: {
    type: Number,
    required: true
  },
  payments: [
    {
      recipientId: {
        type: String
      },
      date: {
        type: Date
      },
      recipientUsername: {
        type: String
      },
      amount: {
        type: Number
      },
      balance: {
        type: Number
      }
    }
  ]
})

export default mongoose.model('transactions', transactionsSchema)
