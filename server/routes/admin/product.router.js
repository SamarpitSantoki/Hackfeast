const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.use(jsonParser);
router.get("/", productController.getAllProducts);
router.post("/", productController.saveProduct);
router.delete("/", productController.deleteProdById);

module.exports = router;
