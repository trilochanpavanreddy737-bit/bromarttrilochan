const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required." });
  }

  try {
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
  } catch (err) {
    console.error("Razorpay Order Error:", err.message);
    res.status(500).json({ message: "Failed to create payment order." });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .toString("hex");

    if (expectedSign === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully! ✅", success: true });
    } else {
      res.status(400).json({ message: "Payment verification failed!", success: false });
    }
  } catch (err) {
    console.error("Verify Error:", err.message);
    res.status(500).json({ message: "Server error during verification." });
  }
};

module.exports = { createOrder, verifyPayment };