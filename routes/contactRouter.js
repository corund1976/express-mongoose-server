import { Router } from 'express'

import validateId from '../middlewares/validateId.js'
import validateContact from '../middlewares/validateContact.js'
import { getAll, getById, create, update, updateFavorite, remove } from '../controllers/contactControllers.js'

const router = Router()

router.get('/', getAll)
router.get('/:id', validateId, getById)
router.post('/', validateContact, create)
router.put('/:id', validateId, validateContact, update)
router.patch('/:id/favorite', validateId, validateContact, updateFavorite)
router.delete('/:id', validateId, remove)

export default router