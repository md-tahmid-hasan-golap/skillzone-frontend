"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "./dashboard/DashboardWrapper";
import { Loader2 } from "lucide-react";

export default function RoleGuard({ allowedRoles, children }) {
  const role = useRole();
  const router = useRouter();

  useEffect(() => {
    // If role is loaded but not allowed, redirect to main dashboard
    if (role && !allowedRoles.includes(role)) {
      router.replace("/dashboard");
    }
  }, [role, allowedRoles, router]);

  // If role is still somehow undefined or not allowed, don't render children
  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Verifying access...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
