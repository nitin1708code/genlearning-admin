import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Mentoring from "./pages/Mentoring";
import Payments from "./pages/Payments";
import Messages from "./pages/Messages";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminNavbar from "./components/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

const ProtectedPage = ({ children }) => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedPage>
              <Users />
            </ProtectedPage>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedPage>
              <Courses />
            </ProtectedPage>
          }
        />

        <Route
          path="/enrollments"
          element={
            <ProtectedPage>
              <Enrollments />
            </ProtectedPage>
          }
        />

        <Route
          path="/mentoring"
          element={
            <ProtectedPage>
              <Mentoring />
            </ProtectedPage>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedPage>
              <Payments />
            </ProtectedPage>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedPage>
              <Messages />
            </ProtectedPage>
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;