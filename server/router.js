'use strict';
const productRoutes = require('./routes/admin/product.router')
const categoryRoutes = require('./routes/admin/category.router')
const orderRoutes = require('./routes/admin/orders.router')
const authRoutes = require('./routes/auth/auth.router')
const paymentRoutes = require('./routes/payment/payment.router')

module.exports = (app) => {
    app.use('/product', productRoutes);
    app.use('/category', categoryRoutes);
    app.use('/order', orderRoutes);
    app.use('/auth', authRoutes);
    app.use('./razorpay', paymentRoutes);
}