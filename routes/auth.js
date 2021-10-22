const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
// const dotenv = require('dotenv')

const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  try {
    if (error !== 'undefined') {
      return res.status(400).send(error.details[0].message)
    }
    res.send(emailExists)
  } catch (err) {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists')
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    })
    try {
      const saveUser = await user.save()
      res.send({ user: user._id })
    } catch (err) {
      res.send('cant save')
    }
  }
})

// Login
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  try {
    if (error !== 'undefined') {
      return res.status(400).send(error.details[0].message)
    }
    // res.send(emailExists)
  } catch (err) {
    const user = await User.findOne({ email: req.body.email })
    if (!user) res.status(400).send('Email is not found')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth_token', token).status(200).send(token)
  }
})

module.exports = router
