import { Router } from 'express'

import auth from '../middlewares/authenticateToken.js'
import validateId from '../middlewares/validateId.js'
import validateContact from '../middlewares/validateContact.js'
import {
  getAll,
  getById,
  create,
  update,
  updateFavorite,
  remove
} from '../controllers/contactControllers.js'

const router = Router()

router.get('/', auth, getAll)
router.get('/:id', auth, validateId, getById)
router.post('/', auth, validateContact, create)
router.put('/:id', auth, validateId, validateContact, update)
router.patch('/:id/favorite', auth, validateId, validateContact, updateFavorite)
router.delete('/:id', auth, validateId, remove)

export default router