import { Router } from 'express'

import { auth, validateUser } from '../middlewares/index.js'
import { signup, login, logout } from '../controllers/authController.js'

const router = Router()

router.post('/signup', validateUser, signup) // public route
router.post('/login', validateUser, login) // public route
router.get('/logout', auth, logout) // all authenticated users

export { router }