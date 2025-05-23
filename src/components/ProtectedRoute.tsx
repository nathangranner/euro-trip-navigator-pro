
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("eurotrip25_auth") === "authenticated";
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem("eurotrip25_auth") === "authenticated";
  
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
