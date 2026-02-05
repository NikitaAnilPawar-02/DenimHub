import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: API call
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="container-fluid theme-bg-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ width: "360px" }}>
        <h3 className="text-center theme-text-primary mb-4">Login</h3>

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

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn theme-btn-primary w-100 fw-bold">
            Login
          </button>
          <div className="text-end mt-3">
            <Link
              to="/changePassword"
              className="theme-text-primary text-decoration-none fw-semibold"
            >
              Change Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
