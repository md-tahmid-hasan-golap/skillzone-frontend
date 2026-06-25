"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import CoursesCard from "@/components/CoursesCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Courses = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: allSkills = [], isLoading } = useQuery({
    queryKey: ["allSkills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allSkills");
      return res.data;
    },
  });

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
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
            className="text-muted-foreground text-lg md:text-xl font-light"
          >
            Discover world-class curriculums designed to take you from beginner to industry-ready professional in record time.
          </motion.p>
        </div>

        {/* Loading State or Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-muted/60 animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8"
          >
            {allSkills.map((skill) => (
              <CoursesCard key={skill._id || skill.id} skill={skill} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Courses;
