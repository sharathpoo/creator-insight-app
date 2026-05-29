const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'User exists' })
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hashed })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ user: { id: user._id, email: user.email, name: user.name }, token })
  } catch (err) { next(err) }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ user: { id: user._id, email: user.email, name: user.name }, token })
  } catch (err) { next(err) }
}

module.exports = { register, login }
