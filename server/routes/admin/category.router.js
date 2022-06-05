const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/admin/category.controller");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);
router.post("/", categoryController.addCategory);
router.delete("/", categoryController.deleteCatbyID);

module.exports = router;
