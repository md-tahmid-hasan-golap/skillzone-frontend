"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Users,
  Star,
  Clock,
  Award,
  CheckCircle2,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";

const SkillsDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const {
    data: skill = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["skillDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/skillsDetails/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Loading course architecture...
        </p>
      </div>
    );
  }

  if (isError || !skill.title) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-destructive/10 text-destructive flex items-center justify-center rounded-2xl mb-4">
          <LayoutGrid className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Course Not Found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          The requested course architecture could not be compiled or mapped.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <div className="relative bg-slate-950 text-slate-50 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/40 via-transparent to-transparent z-0" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 pb-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-indigo-400">
              <Award className="w-3.5 h-3.5" />
              <span>{skill.category || "Specialized Track"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-poppins text-white">
              {skill.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              {skill.description}
            </p>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-50">
                  {skill.rating} Track Rating
                </span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Lead Mentor:</span>
                <span className="font-semibold text-white">
                  {skill.instructor}
                </span>
              </div>
            </div>
          </div>

          {/* Media Module */}
          <div className="lg:col-span-5 w-full">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 group">
              <img
                src={skill.image}
                alt={skill.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Interface Core Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Content Payload */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold font-poppins mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Strategic Syllabus Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                skill.tags || [
                  "Architecture Setup",
                  "Data Layer Modeling",
                  "State Engines",
                  "Security & Deployment",
                ]
              ).map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50 group hover:border-primary/30 transition-colors"
                >
                  <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Scope Matrix */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-poppins">
              Operational Overview
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              This structural program delivers clean engineering concepts,
              robust error handling, and component encapsulation. Engineers will
              deep dive into highly scalable infrastructure patterns designed to
              support intense enterprise production environments effortlessly.
            </p>
          </div>
        </div>

        {/* Floating Parameter Dashboard Panel */}
        <div className="lg:col-span-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Program Access Fee
              </span>
              <div className="text-3xl font-black text-foreground font-poppins">
                TK. {(skill.price || 0).toLocaleString()}
              </div>
            </div>

            <div className="space-y-3.5 pt-2 border-t border-border/60">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Timeline</span>
                </div>
                <span className="font-semibold">{skill.duration}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Curriculum Structure</span>
                </div>
                <span className="font-semibold">{skill.lessons} Lessons</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Active Engineers</span>
                </div>
                <span className="font-semibold">
                  {(skill.enrolledStudents || 0).toLocaleString()} Seats
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Difficulty Level</span>
                </div>
                <span className="font-semibold">
                  {skill.level || "Beginner to Advanced"}
                </span>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_4px_20px_rgba(79,70,229,0.15)] hover:shadow-[0_4px_30px_rgba(79,70,229,0.3)]">
              Initialize Enrollment
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsDetails;
