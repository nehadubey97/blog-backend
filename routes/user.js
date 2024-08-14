const express = require('express')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const authMiddleware = require('../middlewares/auth')
const { hrMiddleware, empMiddleware } = require('../middlewares/role')

router.post('/', authMiddleware, hrMiddleware, async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return res.status(400).json('all the fields are mandatory')
  }

  try {
    // user exists
    const userFound = await User.findOne({
      email,
    })

    if (userFound) {
      return res.status(400).json('user already exist')
    }

    // password encrypt
    const salt = await bcryptjs.genSalt()
    const encryptedPassword = await bcryptjs.hash(password, salt)

    // user save
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      signupBy: req.user._id,
      role,
    })
    res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json('something went wrong')
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json('something went wrong')
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json('user id is required')
  }
  const { name } = req.body
  if (!name) {
    return res.status(400).json('name is required')
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
      },
      {
        new: true,
      }
    )
    res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json('something went wrong')
  }
})

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json('all the fields are mandatory')
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json('no user found')
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json('invalid password')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    })

    console.log('user login successgull')

    res.json(token)
  })
)

module.exports = router
