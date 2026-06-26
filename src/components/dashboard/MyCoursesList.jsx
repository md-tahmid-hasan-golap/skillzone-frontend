"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import { useUser } from "@clerk/nextjs"; // 💡 Clerk হুক ইম্পোর্ট করা হলো
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";
import { BookOpen, Users, Star, Edit, Trash2, Loader2 } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// নির্ভরযোগ্য প্লেসহোল্ডার ইমেজ (via.placeholder এর বিকল্প)
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";

const MyCoursesList = ({ myCourses = [], isLoading, refetch }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useUser(); // 💡 Clerk ইউজার অবজেক্ট

  // 🛠️ ডিলিট করার মিউটেশন লজিক
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      // ইউজারের ইমেইলটি সিকিউর উপায়ে কুয়েরি প্যারামসে পাঠানো হচ্ছে
      const email = user?.primaryEmailAddress?.emailAddress || "";
      const res = await axiosSecure.delete(`/skills/${id}?email=${email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your course has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--background)",
        color: "var(--foreground)",
      });
      refetch(); // 🔄 প্যারেন্ট পেজের ডাটা সাথে সাথে রিলোড হবে
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Failed to delete course.",
        icon: "error",
        background: "var(--background)",
        color: "var(--foreground)",
      });
    },
  });

  // 💥 ডিলিট কনফার্মেশন ডায়ালগ
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "var(--background)",
      color: "var(--foreground)",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // লোডিং স্টেট হ্যান্ডেলিং
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  // ডেটা না থাকলে এম্পটি স্টেট
  if (myCourses.length === 0 || !myCourses[0]) {
    return (
      <div className="w-full text-center py-20 border border-dashed rounded-2xl border-gray-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-foreground">No courses found</h3>
        <p className="text-muted-foreground mt-2">
          You haven't created any courses yet with this email.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {myCourses.map((skill) => {
        if (!skill) return null;
        const {
          _id,
          title,
          instructor,
          price,
          duration,
          rating,
          image,
          description,
          lessons,
          enrolledStudents,
          category,
          createdAt,
        } = skill;

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

            {/* курс ইমেজ এরিয়া */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={image || FALLBACK_IMAGE}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-xs font-semibold text-primary shadow-sm z-10">
                {duration || "N/A"}
              </div>
            </div>

            {/* কার্ড কন্টেন্ট */}
            <div className="p-5 flex flex-col flex-grow relative z-10">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <div className="flex items-center text-amber-500 gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{rating || 0}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground font-medium line-clamp-1">
                  By {instructor || "Unknown"}
                </span>
                {createdAt && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {new Date(createdAt).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>

              {category && (
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-md">
                    {category}
                  </span>
                </div>
              )}

              <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 font-poppins leading-snug group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {description}
              </p>

              {/* স্ট্যাটস এরিয়া */}
              <div className="flex items-center justify-between py-3 border-t border-b border-border/60 mb-5 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium">{lessons || 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium">
                      {enrolledStudents || 0}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">
                    {price ? `৳${price}` : "Free"}
                  </span>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex items-center justify-between gap-2 mt-auto">
                <Link
                  href={`/dashboard/edit-course/${_id}`}
                  className="p-2.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors flex-1 text-center font-bold text-sm flex items-center justify-center gap-2 border border-indigo-500/20"
                  title="Update Course"
                >
                  <Edit className="w-4 h-4" /> Update
                </Link>

                <button
                  onClick={() => handleDelete(_id)}
                  disabled={deleteMutation.isPending}
                  className="p-2.5 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 border border-red-500/20"
                  title="Delete Course"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
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
