import { Router } from 'express'

import { getAll, getById, create, update, updateFavorite, remove } from '../controllers/contactControllers.js'
import checkValidId from '../middlewares/checkValidId.js'

const router = Router()

router.get('/', getAll)
router.get('/:id', checkValidId, getById)
router.post('/', create)
router.put('/:id', checkValidId, update)
router.patch('/:id/favorite', checkValidId, updateFavorite)
router.delete('/:id', checkValidId, remove)

export default router