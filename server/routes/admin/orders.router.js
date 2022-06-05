const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/admin/orders.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);
router.post("/", ordersController.orders);
router.get("/", ordersController.orders);

module.exports = router;
