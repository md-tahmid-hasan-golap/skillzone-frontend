"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Code,
  Server,
  Layout,
} from "lucide-react";

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
    icon: <Layout className="w-6 h-6 text-blue-500" />,
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
    icon: <Server className="w-6 h-6 text-emerald-500" />,
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
    icon: <Code className="w-6 h-6 text-purple-500" />,
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
    icon: <Layout className="w-6 h-6 text-pink-500" />,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Paths" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Fullstack" },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses =
    activeTab === "all"
      ? coursesData
      : coursesData.filter((course) => course.category === activeTab);

  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Explore Programs
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              AI-Powered Hub &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Roadmaps
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Select your path to access custom-tailored syllabus
              recommendations, automated learning logs, and industry-standard
              projects.
            </p>
          </div>

          {/* TAB FILTERS */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 glass-panel rounded-2xl self-start md:self-auto border border-border">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* COURSES RESPONSIVE GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col bg-card border border-border rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                {/* Card Top */}
                <div className="h-40 w-full bg-secondary/50 p-6 flex flex-col justify-between relative overflow-hidden border-b border-border group-hover:bg-secondary transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>

                  <span className="self-start px-3 py-1 text-xs font-bold tracking-wider text-primary bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20 uppercase">
                    {course.badge}
                  </span>

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-background shadow-sm border border-border flex items-center justify-center">
                      {course.icon}
                    </div>
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span>{course.level}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      <span>{course.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} Modules</span>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;
