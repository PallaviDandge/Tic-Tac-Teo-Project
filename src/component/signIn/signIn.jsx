// src/component/signIn/SignIn.jsx
import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function SignIn({ onAuthSuccess }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameInput = e.target[0].value.trim();
    const emailInput = e.target[1].value.trim();
    const passwordInput = e.target[2].value.trim();

    const newUser = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };

    // Save user to localStorage
    localStorage.setItem("ticTacToeUser", JSON.stringify(newUser));

    // Login successful
    onAuthSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form glass-effect">
      <h2 className="form-title">Sign Up</h2>
      <input type="text" placeholder="Username" required className="input-field" />
      <input type="email" placeholder="Email" required className="input-field" />
      <input type="password" placeholder="Password" required className="input-field" />
      <button type="submit" className="auth-button">Sign Up</button>
      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" onClick={() => navigate("/login")} className="link-button">
          Log In
        </button>
      </p>
    </form>
  );
}

export default SignIn;
