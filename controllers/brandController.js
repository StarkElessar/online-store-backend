const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
  async create(req, res) {
    const { name } = req.body
    const brand = await Brand.create({ name })

    return res.json(brand)
  }
  async getAll(req, res) {
    const brands = await Brand.findAll()

    return res.json(brands)
  }
  async update(req, res, next) {
    const { id, name } = req.body
    const brand = await Brand.update({ name: name }, { where: { id } })

    if (!brand[0]) {
      return next(ApiError.internal('Данный бренд не найден'))
    }

    return res.json({ message: 'Бренд успешно изменен' })
  }
  async delete(req, res, next) {
    const id = req.params.id
    const brand = await Brand.destroy({ where: { id } })
    
    if (!brand) {
      return next(ApiError.internal('Данный бренд не найден'))
    }

    return res.json({ message: 'Данный бренд успешно удален' })
  }
}

module.exports = new BrandController()