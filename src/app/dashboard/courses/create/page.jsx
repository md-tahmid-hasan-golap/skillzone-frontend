"use client";

import React from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import CourseForm from "@/components/dashboard/CourseForm";

export default function CreateCoursePage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager"]}>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Create Course
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and publish a new course directly to the platform.
          </p>
        </div>

        <CourseForm />
      </div>
    </RoleGuard>
  );
}
