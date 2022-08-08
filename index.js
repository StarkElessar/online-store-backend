require('dotenv').config() // Импорт .config() из модуля 'dotenv'

const express = require('express') // Импорт модуля Express
const path = require('path')
const sequelize = require('./db') // Импорт обьекта инструкций для БД из файла db.js
const models = require('./models/models') // Импорт моделей БД из файла models.js
const cors = require('cors') // Импорт ф-и cors из пакета cors
const fileUpload = require('express-fileupload') // Модуль для импорта изображений
const router = require('./routes/index') // Импорт основного роутера, который связывает все остальные
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000 // Порт берется из переменной окружения, если такой занят, тогда 5000

const app = express() // Создал объект вызвав функцию express()
app.use(cors()) // Передача ф-и cors - ф-и use(), которая вызывается у обьекта app
app.use(express.json()) // Для того, чтобы приложение могло парсить JSON формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) // Подулючение роутеров
app.use(errorHandler) // Обработка ошибок, подключается последним Middleware

const start = async () => {
  // try/catch для отлова ошибок, чтобы приложение не падало:
  try {
    await sequelize.authenticate() // данная ф-я асинхронная
    await sequelize.sync() // данная ф-я будет сверять состояние БД со схемой данных
    // У объекта app вызываю ф-ю listen(), чтобы указать какой порт должен прослушивать мой сервер 
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

start()