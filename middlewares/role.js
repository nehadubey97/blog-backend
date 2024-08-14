const { EMPLOYEE, HR, ADMIN } = require('../constants/role')

const hrMiddleware = (req, res, next) => {
  const { role } = req.user

  if (role !== HR) {
    return res.status(403).json('you are not authorized')
  }

  next()
}

const empMiddleware = (req, res, next) => {
  const { role } = req.user

  if (role !== EMPLOYEE) {
    return res.status(403).json(' you are not authorized')
  }

  next()
}

const adminMiddleware = (req, res, next) => {
  const { role } = req.user

  if (role !== ADMIN) {
    return res.status(403).json(' you are not authorized')
  }

  next()
}

module.exports = { hrMiddleware, empMiddleware, adminMiddleware }
