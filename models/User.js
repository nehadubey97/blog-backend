const mongoose = require('mongoose')
const { HR, ADMIN, EMPLOYEE } = require('../constants/role')

new mongoose.Schema()

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    signupBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: [HR, ADMIN, EMPLOYEE],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
