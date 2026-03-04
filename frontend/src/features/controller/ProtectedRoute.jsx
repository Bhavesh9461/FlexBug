import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const ProtectedRoute = () => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();


  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;