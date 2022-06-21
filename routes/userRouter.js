import { Router } from 'express'

import { auth, authorizeAdmin, validateUser, validateId } from '../middlewares/index.js'
import { getAll, getById, getCurrent, update, updateCurrentUserSubscription, remove } from '../controllers/userController.js'

const router = Router()

router.get('/', auth, authorizeAdmin, getAll) // admin only
router.get('/current', auth, getCurrent) // all authenticated users
router.get('/:id', auth, authorizeAdmin, validateId, getById) // admin only
router.patch('/subscription', auth, validateUser, updateCurrentUserSubscription) // all authenticated users
router.patch('/:id', auth, authorizeAdmin, validateUser, update) // admin only
router.delete('/', auth, validateUser, remove) // all authenticated users
router.delete('/:id', auth, authorizeAdmin, validateUser, remove) // admin only

export { router }