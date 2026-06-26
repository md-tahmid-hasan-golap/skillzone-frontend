"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, ShieldX } from "lucide-react";

/**
 * RoleGuard — client-side guard that reads the real role from Clerk publicMetadata.
 *
 * Usage:
 *   <RoleGuard allowedRoles={["admin"]}>
 *     <AdminPage />
 *   </RoleGuard>
 */
const RoleGuard = ({ allowedRoles, children }) => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  // Clerk is still initializing
  if (!isLoaded) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Verifying permissions...
        </p>
      </div>
    );
  }

  const role = user?.publicMetadata?.role ?? "user";
  const isAuthorized = allowedRoles.includes(role);

  if (!isAuthorized) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
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
          className="mt-2 px-6 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
        >
          Go to Overview
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
