const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const categoryRoutes = require("./category.router");
const orderRoutes = require("./orders.router");
const productRoutes = require("./product.router");
const userController = require("../../controllers/admin/user.controller");

const jsonParser = bodyParser.json();
router.use(jsonParser);

router.use("/category", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.get("/users", userController.getAllUsers);
router.get("/getcollections", async (req, res) => {
  const data = await mongoose.connection.db.listCollections().toArray();
  // res.status(200).json(typeof data[0].name);
  const collections = data.map((collection) => collection.name);
  res.status(200).json(collections);
});
module.exports = router;
