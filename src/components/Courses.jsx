"use client";

import React, { useState } from "react";
import Link from "next/link";

const Courses = () => {
  // ডাইনামিক ফিল্টারিং এর জন্য স্টেট (Frontend / Backend)
  const [activeTab, setActiveTab] = useState("all");

  // ডক ও প্রজেক্ট স্ট্রাকচার অনুযায়ী ডামি কোর্স ডাটা
  const coursesData = [
    {
      id: 1,
      title: "Ultimate Next.js 15 & Tailwind CSS v4 Masterclass",
      category: "frontend",
      description:
        "Build ultra-fast, SEO-optimized production apps with NextAuth, Server Actions, and dynamic routing.",
      level: "Advanced",
      duration: "18 Hours",
      lessons: 42,
      badge: "AI Recommended",
    },
    {
      id: 2,
      title: "Advanced Node.js, Express & MongoDB Architecture",
      category: "backend",
      description:
        "Master clean architecture, robust Role-Based Access Control (RBAC), JWT authentication, and secure APIs.",
      level: "Intermediate",
      duration: "22 Hours",
      lessons: 56,
      badge: "Popular",
    },
    {
      id: 3,
      title: "MERN Stack Full-Stack Learner Career Path",
      category: "fullstack",
      description:
        "Complete dynamic e-commerce and booking system development with TanStack Query and complex state optimization.",
      level: "Beginner to Pro",
      duration: "45 Hours",
      lessons: 110,
      badge: "Career Track",
    },
    {
      id: 4,
      title: "React 19 & Dynamic UI/UX Design Systems",
      category: "frontend",
      description:
        "Design pixel-perfect layout structures, comfortable white-spaces, and strict border-radius systems.",
      level: "Beginner",
      duration: "14 Hours",
      lessons: 30,
      badge: "New",
    },
  ];

  // ট্যাব অনুযায়ী কোর্স ফিল্টার করার লজিক
  const filteredCourses =
    activeTab === "all"
      ? coursesData
      : coursesData.filter((course) => course.category === activeTab);

  return (
    <div className="w-full bg-white dark:bg-slate-950 py-16 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              Explore Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              AI-Powered Hub &{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Smart Roadmaps
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Select your path to access custom-tailored syllabus
              recommendations, automated learning logs, and industry-standard
              projects.
            </p>
          </div>

          {/* TAB FILTERS (Frontend / Backend Classification) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              All Paths
            </button>
            <button
              onClick={() => setActiveTab("frontend")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "frontend"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveTab("backend")}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "backend"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Backend
            </button>
          </div>
        </div>

        {/* COURSES RESPONSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Card Top: Gradient Image Placeholder */}
              <div className="h-44 w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>

                {/* Badge */}
                <span className="self-start px-2.5 py-1 text-[11px] font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 rounded-md shadow-sm border border-slate-100 dark:border-slate-800">
                  {course.badge}
                </span>

                {/* Tech Mini Graphics */}
                <div className="flex items-center gap-2 text-white/90 z-10">
                  <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-sm font-bold">
                    {course.category === "frontend"
                      ? "FE"
                      : course.category === "backend"
                        ? "BE"
                        : "FS"}
                  </div>
                  <span className="text-xs font-medium tracking-wider text-slate-300 uppercase">
                    {course.category} program
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    <span>{course.level}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Card Footer Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{course.lessons} Modules</span>
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all"
                  >
                    <span>Enroll Now</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
