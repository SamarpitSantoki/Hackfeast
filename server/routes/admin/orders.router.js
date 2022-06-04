const express = require('express')
const router = express.Router()
const ordersController = require('../../controllers/admin/orders.controller')

router.post('/', ordersController.orders)
router.get('/', ordersController.orders)

module.exports = router