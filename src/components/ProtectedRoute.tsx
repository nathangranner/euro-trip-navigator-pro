
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // No authentication required - just render children
  return <>{children}</>;
};

export default ProtectedRoute;
