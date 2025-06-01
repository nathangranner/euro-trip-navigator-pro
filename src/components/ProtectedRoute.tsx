
import React from "react";
import PasswordProtection from "./PasswordProtection";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return <PasswordProtection onPasswordCorrect={() => login("Martin9330")} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
