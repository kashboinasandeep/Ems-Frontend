import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      console.log("Logged in successfully");
      alert(" logged in successfully!");

      // Navigate based on userRole
      const userRole = response.data.userRole;
      if (userRole === "ADMIN") {
        navigate("/home"); // Navigate to admin dashboard
      } else {
        navigate("/EmployeeDashboard"); // Navigate to customer dashboard
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password and try again.");
    }
  };

  return (
    <div className="login-background">
      <div className="main-container">
        <div className="form-container">
          <h1 className="heading">Log In</h1>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${emailError ? 'input-error' : ''}`}
            />
            {emailError && <p className="error-text">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-field ${passwordError ? 'input-error' : ''}`}
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <button onClick={handleLogin} className="login-button">
            Log In
          </button>
          <div className="actions-container">
            <button onClick={() => navigate("/forget-password")} className="action-button">
              Forgot Password
            </button>
            <button onClick={() => navigate("/reset-password")} className="action-button">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
