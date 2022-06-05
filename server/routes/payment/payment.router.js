const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/payment/payment.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);
router.post("/razorpay", paymentController.razorpay);
router.post("/confirm", paymentController.confirm);

module.exports = router;
