import { Router } from 'express'

import { auth, validateId, validateContact } from '../middlewares/index.js'
import contactCtrl from '../controllers/contactController.js'

const router = Router()

router.get('/', auth, contactCtrl.getAll)
router.get('/:id', auth, validateId, contactCtrl.getById)
router.post('/', auth, validateContact, contactCtrl.create)
router.put('/:id', auth, validateId, validateContact, contactCtrl.update)
router.patch('/:id/favorite', auth, validateId, validateContact, contactCtrl.updateFavorite)
router.delete('/:id', auth, validateId, contactCtrl.remove)

export { router }