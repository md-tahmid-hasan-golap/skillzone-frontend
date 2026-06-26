"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import CoursesCard from "@/components/CoursesCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutGrid,
  Code,
  Database,
  Palette,
  Layers,
} from "lucide-react";

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

const categories = [
  { id: "all", name: "All Tracks", icon: LayoutGrid },
  { id: "Web Development", name: "Web Dev", icon: Code },
  { id: "Database", name: "Database", icon: Database },
  { id: "UI/UX Design", name: "Design", icon: Palette },
];

const Courses = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: allSkills = [], isLoading } = useQuery({
    queryKey: ["allSkills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSkills");
      return res.data;
    },
  });

  const filteredSkills =
    selectedCategory === "all"
      ? allSkills
      : allSkills.filter((skill) => skill.category === selectedCategory);

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

        {/* Filter Navigation Bar (Aligned to Right) */}
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
              const isActive = selectedCategory === category.id;
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
