import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuthStore } from "./store/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const token = useAuthStore((s) => s.token);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route
          path="/dashboard"
          element={
              token ? <Dashboard /> : <Navigate to="/login" replace />
          }
      />

      {/* Redirect root to dashboard if logged in, else login */}
      <Route
          path="/"
          element={
              <Navigate to={token ? "/dashboard" : "/login"} replace />
          }
      />
    </Routes>
  );
}
