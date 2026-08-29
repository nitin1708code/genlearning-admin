import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <aside className="admin-navbar">

      <div className="admin-navbar-brand">
        <div className="admin-navbar-logo">GL</div>

        <div>
          <h2>GenLearning</h2>
          <span>ADMIN PANEL</span>
        </div>
      </div>

      <nav className="admin-nav">

        <NavLink to="/dashboard">
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink to="/users">
          <span>◉</span>
          Users
        </NavLink>

        <NavLink to="/courses">
          <span>▣</span>
          Courses
        </NavLink>

        <NavLink to="/enrollments">
          <span>▤</span>
          Enrollments
        </NavLink>

        <NavLink to="/mentoring">
          <span>◇</span>
          Mentoring
        </NavLink>

        <NavLink to="/payments">
          <span>₹</span>
          Payments
        </NavLink>

        <NavLink to="/messages">
          <span>✉</span>
          Messages
        </NavLink>

      </nav>

      <button
        className="admin-logout-btn"
        onClick={handleLogout}
      >
        <span>↪</span>
        Logout
      </button>

    </aside>
  );
};

export default AdminNavbar;