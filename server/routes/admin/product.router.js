const express = require('express')
const router = express.Router()
const productController = require('../../controllers/admin/product.controller')

router.get("/", productController.saveProduct);
router.post("/deleteproduct", productController.deleteProdById);
router.post('/getprodbycat', productController.getProdByCat);
router.post('/search', productController.productSearch);

module.exports = router;