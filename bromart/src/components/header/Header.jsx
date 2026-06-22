import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  document.title = "Bro's-Mart | Home";
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div id="container2">
        <h1>Welcome to Bro's-Mart 🛍️</h1>
        <p>Your one-stop shop for everything you need — electronics, fashion, groceries, beauty, furniture and much more. Best prices, fast delivery, happy shopping!</p>
        <button onClick={() => navigate("/products")}>Explore Products →</button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-card">
          <span>🚚</span>
          <h3>Free Delivery</h3>
          <p>Free shipping on all orders above $50. We deliver to your doorstep fast.</p>
        </div>
        <div className="feature-card">
          <span>🔒</span>
          <h3>Secure Payments</h3>
          <p>100% secure and encrypted payment gateway. Shop with confidence.</p>
        </div>
        <div className="feature-card">
          <span>↩️</span>
          <h3>Easy Returns</h3>
          <p>Not satisfied? Return within 7 days. No questions asked, full refund.</p>
        </div>
        <div className="feature-card">
          <span>🎧</span>
          <h3>24/7 Support</h3>
          <p>Our support team is always available to help you with any issue.</p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-item" onClick={() => navigate("/products")}>
            <span>💄</span><p>Beauty</p>
          </div>
          <div className="category-item" onClick={() => navigate("/products")}>
            <span>🛋️</span><p>Furniture</p>
          </div>
          <div className="category-item" onClick={() => navigate("/products")}>
            <span>🥦</span><p>Groceries</p>
          </div>
          <div className="category-item" onClick={() => navigate("/products")}>
            <span>🌸</span><p>Fragrances</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;