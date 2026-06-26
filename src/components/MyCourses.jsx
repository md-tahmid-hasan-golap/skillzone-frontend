"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs"; // 🎯 Clerk-এর হুক
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import MyCoursesList from "@/components/dashboard/MyCoursesList"; // 🔄 আপনার অ্যানিমেটেড লিস্ট কম্পোনেন্ট

const MyCourses = () => {
  const { user } = useUser();
  const axiosSecure = UseAxiosSecure();

  // Clerk থেকে লগইন করা ইউজারের মেইন ইমেইল
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // TanStack Query দিয়ে ডাইনামিক ইমেল রাউটে ডেটা লোড
  const {
    data: myCourses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["mySkills", userEmail],
    enabled: !!userEmail, // ইমেল পাওয়ার পর কুয়েরি রান হবে
    queryFn: async () => {
      const res = await axiosSecure.get(`/mySkills/${userEmail}`);

      // ব্যাকএন্ড যেহেতু findOne() দিয়ে অবজেক্ট দেয়, তাই ফ্রন্টএন্ড ম্যাপ ক্র্যাশ এড়াতে একে অ্যারেতে কনভার্ট করা হলো
      return Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Created Courses
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Total Courses Found:{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {isLoading ? "Loading..." : myCourses.filter(Boolean).length}
          </span>
        </p>
      </div>

      {/* অ্যানিমেটেড লিস্ট কম্পোনেন্টে ডেটা এবং রিফেচ মেথড পাস করা হলো */}
      <MyCoursesList
        myCourses={myCourses}
        isLoading={isLoading}
        refetch={refetch}
        userEmail={userEmail}
      />
    </div>
  );
};

export default MyCourses;
