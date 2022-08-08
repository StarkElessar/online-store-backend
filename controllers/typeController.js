const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
  async create(req, res) {
    const { name } = req.body
    const type = await Type.create({ name })

    return res.json(type)
  }
  async getAll(req, res) {
    const types = await Type.findAll()

    return res.json(types)
  }
  async update(req, res, next) {
    const { id, name } = req.body
    const type = await Type.update({ name: name }, { where: { id } })
    
    if (!type[0]) {
      return next(ApiError.internal('Данный тип не найден в Базе Данных!'))
    }

    return res.json({ message: 'Успешно изменено' })
  }
  async delete(req, res, next) {
    const id = req.params.id
    const type = await Type.destroy({ where: { id } })
    
    if (!type) {
      return next(ApiError.internal('Данный тип не найден'))
    }

    return res.json({ message: 'Данный тип успешно удален' })
  }
}

module.exports = new TypeController()