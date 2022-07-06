"use strict";
const bodyParser = require("body-parser");
const Product = require("./models/productSchema");
const authRoutes = require("./routes/auth/auth.router");
const paymentRoutes = require("./routes/payment/payment.router");
const adminRoutes = require("./routes/admin/index.router");
const productRoutes = require("./routes/product/index.router");
const userRoutes = require("./routes/user/index.router");
module.exports = (app) => {
  app.use("/api/admin", adminRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/payment", paymentRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/user", userRoutes);
  app.get("/api/prodbycat", adminRoutes);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
};
