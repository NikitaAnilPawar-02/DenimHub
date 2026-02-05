import { useState } from "react";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // later: API call
    console.log("Username:", username);
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
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

          {/* New Password */}
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
