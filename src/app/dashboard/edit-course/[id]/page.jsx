"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import CourseForm from "@/components/dashboard/CourseForm";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/components/dashboard/DashboardWrapper";

export default function EditCoursePage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const axiosSecure = UseAxiosSecure();
  const router = useRouter();
  const role = useRole();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["skillsDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/skillsDetails/${id}`);
      return res.data;
    },
  });

  const handleSuccess = () => {
    // Redirect back to My Courses based on role
    if (role === "admin") {
      router.push("/dashboard/admin/my-courses");
    } else {
      router.push("/dashboard/manager/my-courses");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="w-full text-center py-20 text-red-500">
        Error loading course details.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Edit Course</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Update the information for "{course.title}"
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CourseForm initialData={course} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
