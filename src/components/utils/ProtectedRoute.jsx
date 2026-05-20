import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}