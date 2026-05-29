const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const authRoutes = require('./routes/authRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)

app.use(errorHandler)

module.exports = app
