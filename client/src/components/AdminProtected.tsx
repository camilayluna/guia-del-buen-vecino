import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import AdminLogin from "@/pages/admin/Login";

interface AdminProtectedProps {
  children: React.ReactNode;
}

export function AdminProtected({ children }: AdminProtectedProps) {
  const { isLoading, logout } = useAdminAuth();
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [isMounted, setIsMounted] = useState(false);

  // Check authentication status whenever component mounts or updates
  useEffect(() => {
    const authenticated = sessionStorage.getItem("admin_authenticated") === "true";
    setIsAuthenticated(authenticated);
    setIsMounted(true);
  }, []);

  // Expose logout function globally for AdminLayout to use
  useEffect(() => {
    (window as any).__adminLogout = logout;
  }, [logout]);

  if (isLoading || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}
