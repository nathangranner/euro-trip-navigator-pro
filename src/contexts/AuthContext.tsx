
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authState = localStorage.getItem("eurotrip25_auth");
    if (authState === "authenticated") {
      setIsAuthenticated(true);
      setUser({ id: "user-1", email: "user@eurotrip25.com" });
    }
  }, []);

  const login = (password: string) => {
    if (password === "Martin9330") {
      setIsAuthenticated(true);
      setUser({ id: "user-1", email: "user@eurotrip25.com" });
      localStorage.setItem("eurotrip25_auth", "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("eurotrip25_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
