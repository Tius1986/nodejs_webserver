const express = require('express')
const confirmationController = require('../controllers/confirmationController')
const router = express.Router()

router.get('/:confirmationCode', confirmationController.handleConfirmation)

module.exports = router