const Order = require("../../models/orderSchema");

exports.orders = async (req, res) => {
  if (req.method == "GET") {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } else if (req.method == "POST") {
    const order = await Order.findById(req.body.id);
    console.log(order);
    if (order) {
      try {
        order.status = req.body.status;
        // order.amount = 100;
        await order.save();
        return res
          .status(200)
          .json({ success: true, message: "Order status updated" });
      } catch (error) {
        return res.status(200).json({ success: false, message: error.message });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not found" });
    }
  }
  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
};
