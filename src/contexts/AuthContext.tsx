
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated with extended persistence
    const authState = localStorage.getItem("eurotrip25_auth");
    const authTimestamp = localStorage.getItem("eurotrip25_auth_timestamp");
    
    if (authState === "authenticated") {
      // Check if we have a timestamp and if it's within a very long period (1 year)
      if (authTimestamp) {
        const loginTime = parseInt(authTimestamp);
        const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
        const now = Date.now();
        
        if (now - loginTime < oneYear) {
          setIsAuthenticated(true);
          setUser({ id: "user-1", email: "user@eurotrip25.com" });
          console.log("User automatically logged in from persistent storage");
        } else {
          // Session expired after 1 year, clear it
          localStorage.removeItem("eurotrip25_auth");
          localStorage.removeItem("eurotrip25_auth_timestamp");
        }
      } else {
        // Legacy auth without timestamp - keep it valid
        setIsAuthenticated(true);
        setUser({ id: "user-1", email: "user@eurotrip25.com" });
        // Add timestamp for future reference
        localStorage.setItem("eurotrip25_auth_timestamp", Date.now().toString());
      }
    }
  }, []);

  const login = (password: string) => {
    if (password === "Martin9330") {
      setIsAuthenticated(true);
      setUser({ id: "user-1", email: "user@eurotrip25.com" });
      localStorage.setItem("eurotrip25_auth", "authenticated");
      localStorage.setItem("eurotrip25_auth_timestamp", Date.now().toString());
      console.log("User logged in successfully with persistent session");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("eurotrip25_auth");
    localStorage.removeItem("eurotrip25_auth_timestamp");
    console.log("User logged out and persistent session cleared");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
