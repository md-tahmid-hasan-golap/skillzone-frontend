"use client";

import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-950 py-16 transition-colors duration-300">
      {/* Max-width 1400px মেইনটেইন করা হয়েছে */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* SECTION 1: HERO & MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shaping the Future of Learning with{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              SkillZone AIis dedicated to democratizing tech education across
              Bangladesh and beyond. We combine cutting-edge artificial
              intelligence with industry-standard curriculum to deliver a
              personalized, highly effective learning roadmap for aspiring
              developers and professionals.
            </p>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you are starting from scratch or looking to upskill in
              MERN Stack, Next.js, or AI integration, our smart ecosystem adapts
              to your speed, ensuring true mastery of skills.
            </p>
          </div>

          {/* Right Visual Box */}
          <div className="relative p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 z-10">
              Why SkillZone AI?
            </h3>
            <ul className="space-y-3.5 z-10">
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Automated AI Syllabus & Content Generation tailored to your
                  goals.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Context-Aware AI Chat Assistant for 24/7 instant learning
                  support.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Production-quality dynamic charts and Role-Based Dashboards.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2: STATISTICS / HIGHLIGHTS (Doc Requirement) */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                10K+
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Active Students
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                50+
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                AI-Powered Courses
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                94%
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Success Rate
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                24/7
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Smart Support
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: CORE VALUES / CORE FEATURES */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Pillars of Our Platform
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              We focus on standard structures and absolute responsiveness to
              provide the ultimate full-stack user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Advanced RBAC */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                Role-Based Dashboards
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Separate tailored views for Users, Admins, and Managers
                featuring complex data tables and live tracking charts.
              </p>
            </div>

            {/* Card 2: AI Feature Ready */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                Smart Intelligence
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                From NLP categorization to context-aware chatbots, AI acts as a
                personal mentor throughout your learning journey.
              </p>
            </div>

            {/* Card 3: UI/UX Consistency */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                Visual Flow & Spacing
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Sticking to strict layout consistency rules, comfortable
                paddings, and precise border-radius for responsive designs.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: CALL TO ACTION (CTA) */}
        <div className="text-center bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-12 shadow-lg text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Accelerate Your Career?
          </h3>
          <p className="text-sm sm:text-base text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who are mastering modern software
            engineering through automated AI syllabus recommendations and
            premium full-stack practices.
          </p>
          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Explore AI Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
