"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, Star, Edit, Trash2, ArrowRight, Loader2 } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const MyCoursesList = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: myCourses = [], isLoading } = useQuery({
    queryKey: ["mySkills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mySkills");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mySkills"]);
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to delete course.");
    }
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (myCourses.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <h3 className="text-xl font-bold text-foreground">No courses found</h3>
        <p className="text-muted-foreground mt-2">You haven't created any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {myCourses.map((skill) => {
        const { _id, title, instructor, price, duration, rating, image, description, lessons, enrolledStudents } = skill;

        return (
          <motion.div
            key={_id}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            whileHover={{ y: -8 }}
            className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={image || "/placeholder-course.jpg"}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Course+Image'; }}
              />
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-xs font-semibold text-primary shadow-sm z-10">
                {duration || "N/A"}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-500 gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{rating || 0}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground font-medium line-clamp-1">
                  By {instructor || "Unknown"}
                </span>
              </div>

              <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 font-poppins leading-snug group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {description}
              </p>

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
              <div className="flex items-center justify-between gap-2 mt-auto">
                <Link
                  href={`/skillsDetails/${_id}`}
                  className="p-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors flex-1 text-center font-semibold text-sm flex items-center justify-center gap-1"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" /> View
                </Link>
                <Link
                  href={`/dashboard/edit-course/${_id}`}
                  className="p-2 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors flex-1 text-center font-semibold text-sm flex items-center justify-center gap-1"
                  title="Edit Course"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  disabled={deleteMutation.isPending}
                  className="p-2 bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                  title="Delete Course"
                >
                  {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MyCoursesList;
