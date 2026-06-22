import Contact from "./pages/contact-us/Contactus.jsx";
import Nav from "./components/navbar/Navbar.jsx";
import Signup from "./pages/sign-up/Signup.jsx";
import Signin from "./pages/sign-in/Signin.jsx";
import Products from "./pages/products/Product.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Profile from "./components/profile/Profile.jsx";
import Productdetails from "./pages/product-details/Productdetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

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

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    window.location.href = "/signin";
  }

  return (
    <div>
      {user && <Nav cartCount={cart.length} user={user} handleLogout={handleLogout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={user ? <Navigate to="/" /> : <Signin setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup setUser={setUser} />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute user={user}><Header /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute user={user}><Products addToCart={addToCart} /></ProtectedRoute>} />
        <Route path="/product-details/:id" element={<ProtectedRoute user={user}><Productdetails addToCart={addToCart} /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute user={user}><Cart cart={cart} removeFromCart={removeFromCart} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Profile user={user} /></ProtectedRoute>} />
        <Route path="/contactus" element={<ProtectedRoute user={user}><Contact /></ProtectedRoute>} />
      </Routes>
      {user && <Footer />}
    </div>
  );
}

export default App;