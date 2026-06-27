"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { Loader2 } from "lucide-react";

export const RoleContext = createContext("user");
export const useRole = () => useContext(RoleContext);

const DashboardWrapper = ({ children }) => {
  const { isLoaded, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dbRole, setDbRole] = useState(null);
  const [isFetchingRole, setIsFetchingRole] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setIsFetchingRole(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/user/${user.id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setDbRole(data.user?.role || "user");
        } else {
          setDbRole("user");
        }
      } catch (err) {
        console.error("Failed to fetch user role from DB:", err);
        setDbRole("user");
      } finally {
        setIsFetchingRole(false);
      }
    };

    fetchRole();
  }, [isLoaded, user]);

  // Show a full-screen loader while Clerk is initializing or fetching role
  if (!isLoaded || isFetchingRole) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const role = dbRole || "user";

  return (
    <RoleContext.Provider value={role}>
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
          <TopNav role={role} toggleMobileMenu={() => setIsMobileMenuOpen(true)} />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-background">
            <div className="mx-auto max-w-7xl h-full">{children}</div>
          </main>
        </div>
      </div>
    </RoleContext.Provider>
  );
};

export default DashboardWrapper;
