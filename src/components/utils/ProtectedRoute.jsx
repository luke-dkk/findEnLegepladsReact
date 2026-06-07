import { Navigate, Outlet } from "react-router";


export default function ProtectedRoute() {
  const token = localStorage.getItem("jwtToken");

  if (!token ) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

{/*
  import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
      return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("jwtToken");
    return <Navigate to="/auth/login" replace />;
  }
}}
  */}