const { Sequelize } = require('sequelize') // Импорт класса 'Sequelize' из модуля 'sequelize'
// Экспортирую обьект, который создаю из класса 'Sequelize'
module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Имя пользователя БД
  process.env.DB_PASSWORD,// Пароль от БД
  {
    dialect: 'postgres', // Тип СУБД
    host: process.env.DB_HOST, // Хост
    port: process.env.DB_PORT // Порт
  }
)