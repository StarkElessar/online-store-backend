const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer 'token:qwrqwq1qbf3ttq2q'

    if (!token) {
      res.status(401).json({ message: 'Пользователь не авторизован!' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Пользователь не авторизован!' })
  }
}