import { Router } from 'express'

import validateUser from '../middlewares/validateUser.js'
import auth from '../middlewares/authenticateToken.js'
import {
  signup,
  login,
  logout,
  current,
  update,
} from '../controllers/userControllers.js'

const router = Router()

router.post('/signup', validateUser, signup)
router.post('/login', validateUser, login)
router.get('/logout', auth, logout)
router.get('/current', auth, current)
router.patch('/', auth, validateUser, update)

export default router