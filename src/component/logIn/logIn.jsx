// src/component/logIn/LogIn.jsx
import React from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

function LogIn({ onAuthSuccess }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameInput = e.target[0].value.trim();
    const passwordInput = e.target[1].value.trim();

    const savedUser = JSON.parse(localStorage.getItem("ticTacToeUser"));

    if (savedUser && savedUser.username === usernameInput && savedUser.password === passwordInput) {
      onAuthSuccess();
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form glass-effect">
      <h2 className="form-title">Welcome Back</h2>
      <input type="text" placeholder="Username" required className="input-field" />
      <input type="password" placeholder="Password" required className="input-field" />
      <button type="submit" className="auth-button">Login</button>
      <p className="switch-text">
        Don't have an account?{" "}
        <button type="button" onClick={() => navigate("/signin")} className="link-button">
          Sign Up
        </button>
      </p>
    </form>
  );
}

export default LogIn;
