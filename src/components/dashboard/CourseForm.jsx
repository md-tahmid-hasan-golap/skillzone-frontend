"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import {
  PlusCircle,
  Loader2,
  Image as ImageIcon,
  BookOpen,
  Clock,
  DollarSign,
  Award,
  Users,
  Tags,
  Star,
  Briefcase,
  Mail,
} from "lucide-react"; // 🛠️ ফিক্স: '_id' এর ভুল ইম্পোর্টটি রিমুভ করা হয়েছে
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";
import AIContentGenerator from "../AIContentGenerator";

export default function CourseForm({ initialData = null, onSuccess }) {
  const axiosSecure = UseAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  // ডাইনামিক ডাটা বাইন্ডিং এর জন্য values প্রোপার্টি ব্যবহার করা হলো
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      title: initialData?.title || "",
      category: initialData?.category || "",
      description: initialData?.description || "",
      rating: initialData?.rating || "",
      instructor: initialData?.instructor || "",
      image: initialData?.image || "",
      tags: Array.isArray(initialData?.tags)
        ? initialData?.tags.join(", ")
        : initialData?.tags || "",
      price: initialData?.price || "",
      duration: initialData?.duration || "",
      lessons: initialData?.lessons || "",
      enrolledStudents: initialData?.enrolledStudents || 0,
      level: initialData?.level || "Beginner to Advanced",
      email: initialData?.creatorEmail || initialData?.email || userEmail || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // 🛠️ ফিক্স: আইডি সুরক্ষার জন্য আলাদা ভেরিয়েবলে নেওয়া হলো
    const targetId = initialData?._id || initialData?.id;

    try {
      // ডাটা টাইপ কাস্টিং ও প্রসেসিং
      const payload = {
        ...data,
        rating: parseFloat(data.rating) || 0,
        price: parseFloat(data.price) || 0,
        lessons: parseInt(data.lessons) || 0,
        enrolledStudents: parseInt(data.enrolledStudents) || 0,
        tags: Array.isArray(data.tags)
          ? data.tags
          : (data.tags || "").split(",").map((t) => t.trim()),
      };

      // 🛠️ ফিক্স: ব্যাকএন্ডের ওনারশিপের সাথে মেলানোর জন্য কনসিস্টেন্ট ইমেইল প্রোপার্টি পাঠানো হচ্ছে
      payload.creatorEmail = data.email || userEmail;
      payload.email = data.email || userEmail;

      if (initialData && targetId) {
        // আপডেট রিকোয়েস্ট (PUT)
        await axiosSecure.put(`/skills/${targetId}`, payload);

        Swal.fire({
          title: "Course Updated!",
          text: "Course has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          background: "var(--background)",
          color: "var(--foreground)",
        });
      } else {
        // নতুন কোর্স তৈরি (POST)
        await axiosSecure.post("/skills", payload);
        Swal.fire({
          title: "Course Created!",
          text: "New course has been added successfully.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          background: "var(--background)",
          color: "var(--foreground)",
        });
        reset();
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Front-end API Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Forbidden: Permission denied or invalid course ID.";

      Swal.fire({
        title: "Error!",
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "var(--background)",
        color: "var(--foreground)",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/20">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" />
          {initialData ? "Update Course Details" : "Create New Course"}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-2xl">
          {initialData
            ? "Edit the existing details of the course."
            : "Fill out the information below to add a new course to the platform."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-foreground">
              Creator Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="email"
                readOnly
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-input rounded-xl text-sm focus:outline-none cursor-not-allowed text-muted-foreground"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-foreground">
              Course Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Complete Full Stack Web Development Bootcamp"
              className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              {...register("title", { required: true })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-foreground">
              Description *
            </label>
            <textarea
              rows="4"
              placeholder="Write a compelling description for this course..."
              className="w-full p-4 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* AI Generator */}
          <div className="md:col-span-2">
            <AIContentGenerator />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Category *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="e.g., Web Development"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("category", { required: true })}
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Cover Image URL *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("image", { required: true })}
              />
            </div>
          </div>

          {/* Instructor */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Instructor Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="e.g., Dr. Angela Yu"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("instructor", { required: true })}
              />
            </div>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Difficulty Level *
            </label>
            <select
              className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              {...register("level", { required: true })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Beginner to Advanced">Beginner to Advanced</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Price (TK) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("price", { required: true })}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Duration *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("duration", { required: true })}
              />
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Total Lessons *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="number"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("lessons", { required: true })}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Initial Rating *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Star className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="number"
                step="0.1"
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                {...register("rating", { required: true })}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-foreground">
              Syllabus Tags *
            </label>
            <input
              type="text"
              placeholder="e.g., React JS, Node.js"
              className="w-full px-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              {...register("tags", { required: true })}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {initialData ? "Updating Course..." : "Publishing Course..."}
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                {initialData ? "Update Course" : "Publish Course"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
