"use client";

import React, { useState } from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import { CheckCircle, XCircle, Clock, ShieldCheck, Eye, ArrowLeft } from "lucide-react";
import CourseForm from "@/components/dashboard/CourseForm";

export default function ManagerApprovalsPage() {
  const [showForm, setShowForm] = useState(false);

  // Mock data for pending approvals
  const pendingCourses = [
    { id: 1, title: "Advanced Node.js Scaling", instructor: "Alice Smith", status: "Pending Review", submittedAt: "2 hours ago" },
    { id: 2, title: "UI/UX Foundations", instructor: "John Doe", status: "Pending Review", submittedAt: "5 hours ago" },
  ];

  return (
    <RoleGuard allowedRoles={["manager", "admin"]}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Content Moderation & Approvals</h1>
            <p className="text-sm text-muted-foreground mt-1">Review pending courses and publish approved content to the platform.</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            {showForm ? (
              <>
                <ArrowLeft className="w-5 h-5" />
                Back to Approvals
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                Create New Course
              </>
            )}
          </button>
        </div>

        {showForm ? (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CourseForm />
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Approvals Table */}
            <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Review Queue
              </h2>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-500/20">
                {pendingCourses.length} Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-muted-foreground text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Course Title</th>
                    <th className="px-6 py-4">Submitted By</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pendingCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{course.title}</td>
                      <td className="px-6 py-4 text-muted-foreground">{course.instructor}</td>
                      <td className="px-6 py-4 text-muted-foreground">{course.submittedAt}</td>
                      <td className="px-6 py-4 flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors tooltip" title="Review Content">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors" title="Approve">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Reject">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {pendingCourses.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground">
                        No pending courses in the queue.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </RoleGuard>
  );
}
