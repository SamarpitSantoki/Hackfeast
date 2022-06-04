const express = require('express')
const router = express.Router()
const paymentController = require('../../controllers/payment/payment.controller')

router.post('/payment', paymentController.razorpay);
router.get('/payment', paymentController.razorpay);


module.exports = router;