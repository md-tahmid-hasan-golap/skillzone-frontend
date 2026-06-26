import React from "react";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Learning | SkillZone",
  description: "View and continue your enrolled courses.",
};

export default function MyLearningPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          My Learning
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pick up where you left off and track your progress.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm min-h-[400px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-6 border border-border">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h2 className="text-xl font-semibold text-foreground mb-2">You aren't enrolled in any courses yet.</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Explore our vast catalog of high-quality courses and start your learning journey today!
        </p>

        <Link
          href="/courses"
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
