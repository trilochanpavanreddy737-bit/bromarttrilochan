const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, city, age, gender, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: "Please fill all required fields." });
  }

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered. Please sign in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (name, city, age, gender, email, password, mobile)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email`,
      [name, city, age, gender, email, hashedPassword, mobile]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1", [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Signed in successfully!",
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
    });
  } catch (err) {
    console.error("Signin Error:", err.message);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, city, age, gender, email, mobile FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user: user.rows[0] });
  } catch (err) {
    console.error("Profile Error:", err.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { signup, signin, getProfile };