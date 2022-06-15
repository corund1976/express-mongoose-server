import { Router } from 'express'
import { signup, login, current, logout } from '../controllers/authControllers.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/current', current)
router.get('/logout', logout)

export default router