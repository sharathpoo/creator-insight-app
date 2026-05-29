const express = require('express')
const router = express.Router()
const { getOverview, getPlatform } = require('../controllers/analyticsController')
const { protect } = require('../middleware/authMiddleware')

router.get('/overview', protect, getOverview)
router.get('/:platform', protect, getPlatform)

module.exports = router
