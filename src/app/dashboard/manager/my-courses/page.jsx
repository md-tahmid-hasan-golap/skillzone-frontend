import React from "react";
import MyCoursesList from "@/components/dashboard/MyCoursesList";

export const metadata = {
  title: "My Courses | Manager Dashboard",
  description: "Manage courses you have created.",
};

export default function ManagerMyCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">My Courses</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          View, edit, and manage all the courses you have created.
        </p>
      </div>
      <MyCoursesList />
    </div>
  );
}
