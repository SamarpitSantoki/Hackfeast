const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
