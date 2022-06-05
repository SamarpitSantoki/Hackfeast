const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/user.controller");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
router.use(jsonParser);

router.get("/getorders", userController.getOrders);

module.exports = router;
