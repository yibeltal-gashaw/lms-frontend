import { createContext, useContext, useEffect, useState } from "react";
import {mockLabActorData} from "@/data/mockdata";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    // TODO: Replace with your backend session validation
    const storedUser = localStorage.getItem("lab_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("lab_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

    const mockUser = mockLabActorData[email.toLowerCase()];

    if (!mockUser) {
      return { success: false, error: "User not found" };
    }

    if (mockUser.password !== password) {
      return { success: false, error: "Invalid password" };
    }

    setUser(mockUser.user);
    localStorage.setItem("lab_user", JSON.stringify(mockUser.user));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lab_user");
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
