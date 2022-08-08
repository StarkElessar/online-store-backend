const sequelize = require('../db') // Импорт обьекта sequelize из файла db.js
// Из пакета 'sequelize' импортирую class DataTypes, с помощью которого описываются типы поля:
const { DataTypes } = require('sequelize') 
// Модель Пользователя:
const User = sequelize.define('user', {
  // Поле id, тип:числовой, имеет первичный ключ, и автоматически будет увеличиваться Базой Данных
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // Поле email, тип:строковый, должен быть уникальным
  email: { type: DataTypes.STRING, unique: true },
  // Поле password, тип:строковый
  password: { type: DataTypes.STRING },
  // Поле role (роль пользователя), тип:строковый, по умолчанию все созданные пользователи USER
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})
// Модель Корзины (так сказать корзина для конкретного пользователя):
const Cart = sequelize.define('cart', {
  // Поле id, тип:числовой, имеет первичный ключ, и автоматически будет увеличиваться Базой Данных
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
// Модель Корзины Девайса (корзина для каждого товара, который будет добавлен в корзину):
const CartDevice = sequelize.define('cart_device', {
  // Поле id, тип:числовой, имеет первичный ключ, и автоматически будет увеличиваться Базой Данных
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
// Модель Устройства(продукта, товара)
const Device = sequelize.define('device', {
  // Поле id, тип:числовой, имеет первичный ключ, и автоматически будет увеличиваться Базой Данных
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // Поле name, тип:строковый, должен быть уникальным, обязательно должен быть заполнен
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
})
// Модель Тип (например: холодильник, телевизор)
const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})
// Модель Бренд (например: LG, Samsung..)
const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})
// Модель Рейтинг(оценка товара)
const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
})
// Модель Описания товаров
const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})
// Связующая модель для ТИПОВ и БРЕНДОВ:
const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart) // Пользователь может иметь одну корзину
Cart.belongsTo(User) // Конкретная корзина принадлежит конкретному пользователю

User.hasMany(Rating) // Пользователь может иметь несколько оценок(рейтингов)
Rating.belongsTo(User) // Конкретный рейтинг приндлежит конкретному пользователю

Cart.hasMany(CartDevice) // Одна Конкретная корзина может иметь внутри много товаров добавленных в корзину
CartDevice.belongsTo(Cart) // Конкретный товар принадлежит конкретной корзине

Type.hasMany(Device) // Один конкретный тип товара может иметь много товаров
Device.belongsTo(Type) // Конкретный товар принадлежит одному конкретному типу товара

Brand.hasMany(Device) // Один конкретный товарный бренд может иметь много товаров
Device.belongsTo(Brand) // Конкретный товар принадлежит одному бренду

Device.hasMany(Rating) // Один конкретный товар может иметь много оценок
Rating.belongsTo(Device) // Конкретная оценка принадлежит одному товару

Device.hasMany(CartDevice) // Один конкретный товар может иметь много позиций в корзине
CartDevice.belongsTo(Device) // Одна конкретная позиция в корзине имеет один конкретный товар

Device.hasMany(DeviceInfo, { as: 'info' }) // Одна товар может иметь МНОГО полей с описанием данного товара
DeviceInfo.belongsTo(Device) // Конкретное описание товара может имет только один товар
// Тип связи между ТИПОМ и БРЕНДОМ:
Type.belongsToMany(Brand, { through: TypeBrand }) // Конкретный тип товара может иметь внутри МНОГО брендов
Brand.belongsToMany(Type, { through: TypeBrand }) // Конкретный бренд товара может иметь внутри МНОГО типов
// Export моделей для дальнейшего использования в других файлах проекта:
module.exports = {
  User,
  Cart,
  CartDevice,
  Device,
  Type,
  Brand,
  Rating,
  DeviceInfo,
  TypeBrand
}