import express from 'express'
import * as authController from '../../controller/auth.controller'
import authValidation from '../../middleware/authValidation'

const router = express.Router()

router.get('/', authValidation, authController.getAccountData)
router.post('/', authController.login)
router.post('/registration', authController.registration)

export default router
