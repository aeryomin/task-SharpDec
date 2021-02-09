import express from 'express'
import * as transactionsController from '../../controller/transactions.controller'

const router = express.Router()

router.get('/protected/users/list', transactionsController.getUsers)
router.get('/protected/transactions', transactionsController.getUserTransactionsList)
router.post('/protected/transactions', transactionsController.createTransaction)

export default router
