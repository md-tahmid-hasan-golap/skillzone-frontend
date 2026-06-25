"use client";

import React from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import CourseForm from "@/components/dashboard/CourseForm";

export default function AdminCoursesPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Course Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and publish a new course directly to the platform.</p>
        </div>

        <CourseForm />
      </div>
    </RoleGuard>
  );
}
