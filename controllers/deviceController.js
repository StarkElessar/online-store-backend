const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
      let fileName = `${uuid.v4()}.jpg`
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const device = await Device.create({ name, price, brandId, typeId, img: fileName })

      if (info) {
        info = JSON.parse(info)
        info.forEach(item => DeviceInfo.create({
          title: item.title,
          description: item.description,
          deviceId: device.id
        }))
      }

      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 4
    let offset = page * limit - limit
    let devices

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    }

    return res.json(devices)
  }
  async getOne(req, res) { 
    const { id } = req.params
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }]
    })

    return res.json(device)
  }
  async update(req, res, next) {
    const { id, name, price, brandId, typeId } = req.body
    const device = await Device.update(
      { price: price, name: name, typeId: typeId, brandId: brandId },
      { where: { id } }
    )

    if (!device) {
      return next(ApiError.internal('Данный товар не найден')) 
    }

    return res.json(device)
  }
  async delete(req, res, next) {
    const id = req.params.id
    const device = await Device.destroy({ where: { id } })
    
    if (!device) {
      return next(ApiError.internal('Данный товар не найден')) 
    }

    return res.json({ message: 'Товар успешно удалён' })
  }
}

module.exports = new DeviceController()