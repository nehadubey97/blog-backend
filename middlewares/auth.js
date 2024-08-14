const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json('token is required')
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json('token is required')
  }

  let data = null

  try {
    data = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    console.log(error)
    return res.status(401).json('invalid token')
  }

  const user = await User.findById(data.id).select('-password')

  if (!user) {
    return res.status(401).json('invalid token')
  }

  req.user = user

  next()
}

module.exports = authMiddleware
