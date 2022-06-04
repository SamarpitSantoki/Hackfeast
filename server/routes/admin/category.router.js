const express = require('express')
const router = express.Router()
const categoryController = require('../../controllers/admin/category.controller')

router.post('/', categoryController.addCategory);
router.post('/delete', categoryController.deleteCatbyID);

module.exports = router;