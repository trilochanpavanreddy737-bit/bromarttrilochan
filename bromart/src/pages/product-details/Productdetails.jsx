import "./Productdetails.css";
import { useLocation, useNavigate } from "react-router-dom";

function Productdetails({ addToCart }) {
  document.title = "Product Details";
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No product found!</h2>
        <button onClick={() => navigate("/products")}>Go Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img src={product.thumbnail} alt={product.title} className="pd-image" />
      <div className="pd-info">
        <h1>{product.title}</h1>
        <p className="pd-category">Category: <strong>{product.category}</strong></p>
        <p className="pd-description">{product.description}</p>
        <p className="pd-price">Price: <strong>${product.price}</strong></p>
        <p className="pd-rating">Rating: <strong>{product.rating} ⭐</strong></p>
        <p className="pd-stock">Stock: <strong>{product.stock} items left</strong></p>
        <div className="pd-buttons">
          <button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart 🛒</button>
          <button className="btn-back" onClick={() => navigate("/products")}>← Back to Products</button>
        </div>
      </div>
    </div>
  );
}

export default Productdetails;