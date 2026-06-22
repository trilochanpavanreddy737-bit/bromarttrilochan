import Contact from "./pages/contact-us/Contactus.jsx";
import Nav from "./components/navbar/Navbar.jsx";
import Signup from "./pages/sign-up/Signup.jsx";
import Signin from "./pages/sign-in/Signin.jsx";
import Products from "./pages/products/Product.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Profile from "./components/profile/Profile.jsx";
import Productdetails from "./pages/product-details/Productdetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div>
      <Nav cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/product-details/:id" element={<Productdetails addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;