import { Router } from 'express'

import { auth, authorizeAdmin, validateUser, validateId } from '../middlewares/index.js'
import userCtrl from '../controllers/userController.js'

const router = Router()

router.get('/', auth, authorizeAdmin, userCtrl.getAll) // admin only
router.get('/current', auth, userCtrl.getCurrent) // all authenticated users
router.get('/:id', auth, authorizeAdmin, validateId, userCtrl.getById) // admin only
router.patch('/subscription', auth, validateUser, userCtrl.updateCurrentUserSubscription) // all authenticated users
router.patch('/:id', auth, authorizeAdmin, validateUser, userCtrl.update) // admin only
router.delete('/', auth, validateUser, userCtrl.remove) // all authenticated users
router.delete('/:id', auth, authorizeAdmin, validateUser, userCtrl.remove) // admin only

export { router }