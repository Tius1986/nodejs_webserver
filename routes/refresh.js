const express = require('express')
const refreshTokenController = require('../controllers/refreshTokenController')
const router = express.Router()

router.use('/', refreshTokenController.handleRefreshToken)

module.exports = router