import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Nav({ cartCount, user, handleLogout }) {
  return (
    <div id="container1">
      <nav>
        <Link to="/" className="brand">Bro's<span>-Mart</span></Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/contactus">Contact Us</Link>

          {user ? (
            <>
              <Link to="/profile" className="nav-username">
                👤 {user.name}
              </Link>
              <button onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;