"use client";

import React from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-1">View platform analytics and reports.</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 text-center relative">
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Advanced analytics interface is under development.
          </p>
        </div>
      </div>
    </RoleGuard>
  );
}
