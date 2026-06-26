"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  LayoutGrid,
  Code,
  Database,
  Palette,
  Layers,
  BookOpen,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

// --- অ্যানিমেশন ভেরিয়েন্ট সমূহ ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- ক্যাটাগরি লিস্ট ---
const categories = [
  { id: "all", name: "All Tracks", icon: LayoutGrid },
  { id: "Web Development", name: "Web Dev", icon: Code },
  { id: "Database", name: "Database", icon: Database },
  { id: "UI/UX Design", name: "Design", icon: Palette },
];

// ==========================================
// ১. সাব-কম্পোনেন্ট: CoursesCard
// ==========================================
const CoursesCard = ({ skill }) => {
  if (!skill) return null;

  const {
    title,
    instructor,
    price,
    duration,
    rating,
    image,
    description,
    lessons,
    enrolledStudents,
    _id,
  } = skill;

  return (
    <motion.div
      variants={cardItemVariants}
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Top Gradient Glow on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Course Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
          }
          alt={title || "Course Image"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-xs font-semibold text-primary shadow-sm z-10">
          {duration || "Self-paced"}
        </div>
      </div>

      {/* Course Content Details */}
      <div className="p-5 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-amber-500 gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{rating || "5.0"}</span>
          </div>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground font-medium">
            By {instructor || "Expert"}
          </span>
        </div>

        <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 font-poppins leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Dynamic Meta Matrix */}
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-border/60 mb-5 mt-auto">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium">{lessons || 0} Lessons</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium">
              {enrolledStudents || 0} Students
            </span>
          </div>
        </div>

        {/* Action Layer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Price
            </span>
            <span className="text-lg font-extrabold text-foreground font-poppins">
              TK. {price?.toLocaleString() || 0}
            </span>
          </div>

          <Link
            href={`/skillsDetails/${_id}`}
            className="px-4 py-2.5 bg-foreground hover:bg-primary text-background hover:text-primary-foreground text-sm font-semibold rounded-xl shadow-md transition-all duration-300 flex items-center gap-1.5 group/btn"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// ২. মেইন কম্পোনেন্ট: Courses
// ==========================================
const Courses = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // TanStack Query ফেচিং
  const { data: rawData, isLoading } = useQuery({
    queryKey: ["allSkills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSkills");
      return res.data;
    },
  });

  // 💡 ক্র্যাশ-প্রুফ সেফগার্ড: ডেটা সরাসরি অ্যারে হোক কিংবা অবজেক্টের ভেতর `.data` তে থাকুক—ঠিকঠাক বের করবে।
  const allSkills = Array.isArray(rawData)
    ? rawData
    : rawData?.data || rawData?.skills || [];

  // 💡 ক্যাটাগরি ফিল্টারিং লজিক (বানানের ট্রিম ও কেস হ্যান্ডেল করা হয়েছে)
  const filteredSkills =
    selectedCategory === "all"
      ? allSkills
      : allSkills.filter((skill) => {
          if (!skill || !skill.category) return false;
          return (
            skill.category.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
          );
        });

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Premium Learning</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-foreground font-poppins"
          >
            Explore Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Top Courses
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg font-light max-w-2xl"
          >
            Discover world-class curriculums designed to take you from beginner
            to industry-ready professional in record time.
          </motion.p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6 mb-12">
          <div>
            <h3 className="font-bold text-lg font-poppins">Filter Programs</h3>
            <p className="text-xs text-muted-foreground font-light">
              Select a specific technology domain
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 md:justify-end"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive =
                selectedCategory.toLowerCase() === category.id.toLowerCase();
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? "text-white border-indigo-600 shadow-[0_4px_15px_rgba(79,70,229,0.2)]"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-primary"}`}
                  />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Loading State or Grid Wrapper */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-2xl bg-muted/60 animate-pulse border border-border"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 min-h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill._id || skill.id}
                  variants={itemVariants}
                  layout
                  exit="exit"
                  className="h-full"
                >
                  <CoursesCard skill={skill} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 bg-card/40 border border-dashed border-border rounded-2xl max-w-md mx-auto"
          >
            <Layers className="w-10 h-10 text-muted-foreground/60 mb-3" />
            <h4 className="font-bold text-lg">No tracks found</h4>
            <p className="text-sm text-muted-foreground max-w-xs mt-1">
              There are no courses active within this domain structure right
              now.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;
