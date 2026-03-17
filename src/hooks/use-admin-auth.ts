import { useState, useCallback, useEffect } from "react";

const ADMIN_AUTH_KEY = "admin_authenticated";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    // Use sessionStorage to ensure session expires when browser closes
    const authenticated = sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const login = useCallback((password: string): boolean => {
    const correctPassword = "gestion2027";
    if (password === correctPassword) {
      // Use sessionStorage instead of localStorage for better security
      sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
}
