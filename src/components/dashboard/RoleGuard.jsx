"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldX } from "lucide-react";
import { useRole } from "./DashboardWrapper";

/**
 * RoleGuard — client-side guard that reads the real role from DashboardWrapper context.
 *
 * Usage:
 *   <RoleGuard allowedRoles={["admin"]}>
 *     <AdminPage />
 *   </RoleGuard>
 */
const RoleGuard = ({ allowedRoles, children }) => {
  const role = useRole();
  const router = useRouter();

  // The DashboardWrapper already handles the loading state for `role` before rendering children.
  // So by the time this renders, `role` should be the final resolved string.
  
  const isAuthorized = allowedRoles.includes(role);

  if (!isAuthorized) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Access Denied</h2>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have permission to view this page.
            <br />
            Required role:{" "}
            <span className="font-semibold text-foreground">{allowedRoles.join(" or ")}</span>
          </p>
        </div>
        <button
          onClick={() => router.replace("/dashboard")}
          className="mt-2 px-6 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm"
        >
          Go to Overview
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
