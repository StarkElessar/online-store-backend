const Router = require('express') // Импорт класса Router из 'express'
const router = new Router() // Создание объекта данного Router
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.delete('/:id', checkRole('ADMIN'), typeController.delete)
router.put('/', checkRole('ADMIN'), typeController.update)
router.get('/', typeController.getAll)

module.exports = router // Export данного роутера