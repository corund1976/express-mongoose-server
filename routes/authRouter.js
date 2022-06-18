import { Router } from 'express'
import validateUser from '../middlewares/validateUser.js'
import { signup, login, current, logout } from '../controllers/authControllers.js'

const router = Router()

router.post('/signup', validateUser, signup)
router.post('/login', validateUser, login)
router.get('/current', current)
router.get('/logout', logout)

export default router