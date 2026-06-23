import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ cart, removeFromCart }) {
  document.title = "Cart";
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  async function handlePayment() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_T4t5Xr4w3aJ9Qx",
        amount: data.order.amount,
        currency: "INR",
        name: "Bro's-Mart",
        description: "Purchase Payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verify = await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verify.data.success) {
              alert("🎉 Payment Successful! Thank you for shopping at Bro's-Mart!");
              navigate("/products");
            }
          } catch (err) {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
        theme: {
          color: "#6a0dad",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed! Please try again.");
      console.error(err);
    }
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Your cart is empty 🛒</h2>
        <button
          onClick={() => navigate("/products")}
          style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "coral", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart 🛒</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-info">
              <h3>{item.title}</h3>
              <p>Price: <strong>${item.price}</strong></p>
              <p>Qty: <strong>{item.qty}</strong></p>
              <p>Subtotal: <strong>${(item.price * item.qty).toFixed(2)}</strong></p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove ❌</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: <span>${total.toFixed(2)}</span></h2>
        <button className="checkout-btn" onClick={handlePayment}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}

export default Cart;