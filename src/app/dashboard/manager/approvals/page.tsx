"use client";

import React from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import { BookOpen, Construction } from "lucide-react";

export default function MyCoursesPage() {
  return (
    <RoleGuard allowedRoles={["manager", "admin"]}>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              My Courses
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and view the courses you have authored or published.</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          
          {/* Subtle Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-6 border border-border">
            <Construction className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The My Courses management interface is currently under development. Soon, you will be able to track your course performance, edit existing content, and view student engagement right here.
          </p>

          <button className="px-6 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-xl shadow-sm transition-all cursor-not-allowed opacity-80">
            Feature in Progress
          </button>
        </div>

      </div>
    </RoleGuard>
  );
}