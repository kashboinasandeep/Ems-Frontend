import React, { useState } from "react";
import axios from "axios";
import "./ResetPasswordForm.css";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      alert("Password reset successful.");
    } catch (error) {
      console.error(error);
      alert("Failed to reset password. Please try again.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="form-title">Reset Password</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
        </div>
        {message && <p className="form-message">{message}</p>}
        <div className="form-actions">
          <button onClick={handleResetPassword} className="form-button form-button-primary">Reset Password</button>
          <button onClick={handleReset} className="form-button form-button-secondary">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
