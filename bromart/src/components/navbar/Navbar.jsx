import { Link } from "react-router-dom";
import "./Navbar.css";

function Nav({ cartCount }) {
  return (
    <div id="container1">
      <nav>
        <h1>Bro's<span>-Mart</span></h1>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <button>Log Out</button>
      </nav>
    </div>
  );
}

export default Nav;