const Router = require('express') // Импорт класса Router из 'express'
const router = new Router() // Создание объекта данного Router
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.put('/', checkRole('ADMIN'), deviceController.update)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router // Export данного роутера