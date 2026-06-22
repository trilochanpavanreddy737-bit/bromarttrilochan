import "./Signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin({ setUser }) {
  document.title = "Bro's-Mart | Sign In";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      alert(`Welcome back, ${res.data.user.name}! 👋`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signin-page">
      <form className="signin" onSubmit={handleSubmit}>
        <div className="signin-logo">🛍️</div>
        <h1>Welcome Back!</h1>
        <p className="signin-sub">Sign in to your Bro's-Mart account</p>
        {error && <p className="error-msg">⚠️ {error}</p>}
        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In →"}
        </button>
        <div className="tags">
          <a href="">Forgot password?</a>
          <a onClick={() => navigate("/signup")} style={{cursor:"pointer"}}>New here? Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default Signin;