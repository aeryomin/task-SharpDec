import express from 'express'
import * as authController from '../../controller/auth.controller'

const router = express.Router()

router.get('/:id', authController.getOne)
router.post('/', authController.login)

export default router
