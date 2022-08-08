const Router = require('express') // Импорт класса Router из 'express'
const router = new Router() // Создание объекта данного Router
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create)
router.delete('/:id', checkRole('ADMIN'), brandController.delete)
router.put('/', checkRole('ADMIN'), brandController.update)
router.get('/', brandController.getAll)

module.exports = router // Export данного роутера