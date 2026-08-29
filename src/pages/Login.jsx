import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://admin.genlearning.in/api/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Login failed.");
        return;
      }

      // Save admin token
      localStorage.setItem("adminToken", result.token);

      // Save admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(result.admin)
      );

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Unable to connect to admin server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-brand">
          <div className="admin-logo">
            GL
          </div>

          <div>
            <h1>GenLearning</h1>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        <div className="admin-login-heading">
          <h2>Welcome back.</h2>
          <p>
            Sign in to manage your GenLearning platform.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="admin@genlearning.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <span>→</span>}
          </button>

        </form>

        <p className="admin-login-footer">
          Authorized personnel only.
        </p>

      </div>
    </div>
  );
};

export default Login;