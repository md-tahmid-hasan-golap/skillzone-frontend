import React from "react";
import RoleGuard from "@/components/RoleGuard";

export default function EditCourseLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={["admin", "manager"]}>{children}</RoleGuard>;
}
