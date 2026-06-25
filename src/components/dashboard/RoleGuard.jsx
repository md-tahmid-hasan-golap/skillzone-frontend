"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const RoleGuard = ({ allowedRoles, children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app with Clerk backend sync, you would use useUser() and check user.publicMetadata.role.
    // For this demonstration, we are reading the role from the DashboardWrapper simulator.
    const currentRole = localStorage.getItem("dashboard_role") || "user";
    
    if (allowedRoles.includes(currentRole)) {
      setIsAuthorized(true);
    } else {
      // Redirect unauthorized users to the dashboard overview safely
      router.replace("/dashboard");
    }
    
    setIsLoading(false);
  }, [allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Verifying permissions...
        </p>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default RoleGuard;
