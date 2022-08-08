const Router = require('express') // Импорт класса Router из 'express'
const router = new Router() // Создание объекта данного Router
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
// Вызываю ф-ю use(), первым параметром указываю url по которому будет работать роутер:
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router // Export данного роутера