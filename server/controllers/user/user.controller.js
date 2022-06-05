const Order = require("../../models/orderSchema");

exports.getOrders = async (req, res) => {
  const data = await Order.find({ email: req.query.email });
  const orders = data.map((doc) => {
    const prod = doc.toObject();
    prod._id = prod._id.toString();
    return prod;
  });

  res.status(200).send(orders);
};
