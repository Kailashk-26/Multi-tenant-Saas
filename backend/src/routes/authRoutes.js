import express from 'express'
import { login, signup, superAdminLogin } from '../controllers/authController.js'

const authRouter=express.Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/superlogin',superAdminLogin)

export default authRouter