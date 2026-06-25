"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { motion, AnimatePresence } from "framer-motion";

const DashboardWrapper = ({ children }) => {
  const [role, setRole] = useState("user");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load role from localStorage on mount (for persistence during testing)
  useEffect(() => {
    const savedRole = localStorage.getItem("dashboard_role");
    if (savedRole) setRole(savedRole);
  }, []);

  // Save role when changed
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem("dashboard_role", newRole);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full z-20 shadow-xl">
        <Sidebar role={role} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 shadow-2xl lg:hidden"
            >
              <Sidebar role={role} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <TopNav 
          role={role} 
          setRole={handleRoleChange} 
          toggleMobileMenu={() => setIsMobileMenuOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-background">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
