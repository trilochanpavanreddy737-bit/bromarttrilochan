import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  document.title = "Cart";
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate("/products")} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "coral", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
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
              <p>Price: ${item.price}</p>
              <p>Qty: {item.qty}</p>
              <p>Subtotal: ${(item.price * item.qty).toFixed(2)}</p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove ❌</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;