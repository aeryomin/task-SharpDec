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
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      recipientUsername: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      balance: {
        type: Number,
        required: true
      }
    }
  ]
})

export default mongoose.model('transactions', transactionsSchema)
