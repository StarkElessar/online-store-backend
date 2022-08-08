const Router = require('express') // Импорт класса Router из 'express'
const router = new Router() // Создание объекта данного Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router // Export данного роутера