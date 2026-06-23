import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ setUser }) {
  document.title = "Bro's-Mart | Sign Up";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", city: "", age: "", gender: "", email: "", password: "", mobile: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (formData.mobile.length !== 10 || isNaN(formData.mobile)) {
  setError("Please enter a valid 10 digit mobile number!");
  setLoading(false);
  return;
}
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      alert("Account created successfully! 🎉");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <div className="signup-logo">🛍️</div>
        <h1>Create Account</h1>
        <p className="signup-sub">Join Bro's-Mart and start shopping!</p>
        {error && <p className="error-msg">⚠️ {error}</p>}
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required />
        <input 
  type="tel" 
  name="mobile" 
  placeholder="Mobile Number (10 digits)" 
  onChange={handleChange} 
  pattern="[0-9]{10}"
  maxLength={10}
  title="Please enter a valid 10 digit mobile number"
  required 
/>
        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account →"}
        </button>
        <button type="button" className="signin-redirect" onClick={() => navigate("/signin")}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}

export default Signup;