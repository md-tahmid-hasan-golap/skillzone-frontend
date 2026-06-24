"use client"; // যাতে useState, usePathname এবং Framer Motion ঠিকঠাক কাজ করে ভাই!

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// 👇 অ্যানিমেশনের জন্য framer-motion ইমপোর্ট করা হলো
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // মোবাইল মেনুর অ্যানিমেশন কনফিগারেশন
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo + Name */}
          <Link href={"/"} className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200 dark:shadow-none">
              S
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              SkillZone{" "}
              <span className="text-slate-800 dark:text-white">AI</span>
            </span>
          </Link>

          {/* CENTER: Links */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <Link
                href="/"
                className={`font-medium text-sm transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className={`font-medium text-sm transition-colors duration-200 ${
                  pathname === "/courses"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Courses
              </Link>
              <Link
                href="/about"
                className={`font-medium text-sm transition-colors duration-200 ${
                  pathname === "/about"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`font-medium text-sm transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT: Buttons with Hover Motion */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              Login
            </Link>
            {/* Register বাটনে মাইক্রো-ইন্টারঅ্যাকশন দেওয়া হয়েছে */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href="/sign-up"
                className="block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Register
              </Link>
            </motion.div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU WITH SMOOTH MOTION SLIDE DOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-indigo-600 bg-slate-50 dark:bg-slate-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Home
              </Link>
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === "/courses"
                    ? "text-indigo-600 bg-slate-50 dark:bg-slate-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Courses
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === "/about"
                    ? "text-indigo-600 bg-slate-50 dark:bg-slate-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "text-indigo-600 bg-slate-50 dark:bg-slate-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                Contact
              </Link>
            </div>
            <div className="pt-4 pb-4 border-t border-slate-200 dark:border-slate-800 px-4 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-500 rounded-lg shadow-md"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
