import "./Footer.css";

function Footer() {
  return (
    <div id="container3">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Bro's-Mart</h2>
          <p>Your one-stop shop for everything. Quality products, unbeatable prices.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/products">Products</a>
          <a href="/contactus">Contact Us</a>
          <a href="/signin">Sign In</a>
          <a href="/signup">Sign Up</a>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href="">📸 Instagram</a>
          <a href="">🐦 Twitter</a>
          <a href="">👤 Facebook</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Bro's-Mart. All rights reserved. Made with ❤️</p>
      </div>
    </div>
  );
}

export default Footer;