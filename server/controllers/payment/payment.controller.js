const Razorpay = require("razorpay");
const shortid = require("shortid");
const Order = require("../../models/orderSchema");
exports.razorpay = async (req, res) => {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = 499;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
};

exports.confirm = async (req, res) => {
  const { cart, amount, response, name, id, email, address } = req.body;
  const order = new Order({
    id: id,
    name: name,
    email,
    amount: parseInt(amount),
    orderArray: cart,
    status: "pending",
    payment_id: response.razorpay_payment_id,
    order_id: response.razorpay_order_id,
    address,
  });
  try {
    await order.save();
    res.status(200).send({ success: true, message: "Order Created" });
  } catch (err) {
    res.status(200).send({ success: false, message: "Order Not Created" });
  }
};
