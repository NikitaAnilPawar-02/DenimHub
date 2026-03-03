// src/pages/ChangePassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ChangePassword() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          username,
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(response.data); // "Password changed successfully"
      setUsername("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Change Password Error:", error.response || error);
      setMessage(error.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid theme-bg-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center theme-text-primary mb-4">Change Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn theme-btn-primary w-100 fw-bold">
            Update Password
          </button>

          {message && (
            <p
              className="mt-3 text-center"
              style={{ color: message.includes("success") ? "green" : "red" }}
            >
              {message}
            </p>
          )}

          <div className="text-end mt-3">
            <Link
              to="/login"
              className="theme-text-primary text-decoration-none fw-semibold"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;