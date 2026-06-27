"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Menu, X, Sparkles, LayoutDashboard } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "All Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              SkillZone <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-1 bg-secondary/50 p-1 rounded-full border border-border">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative px-4 py-1.5 text-sm font-medium transition-colors"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-background rounded-full shadow-sm border border-border"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-full shadow-md shadow-primary/20 transition-all cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 border border-border shadow-sm" } }}>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Go to Dashboard"
                    labelIcon={<LayoutDashboard className="w-4 h-4" />}
                    href="/dashboard"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-3 text-sm font-medium text-foreground bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      Log in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-all"
                    >
                      Sign up
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex flex-col items-center gap-3 py-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full px-4 py-3 text-sm font-bold text-center text-primary-foreground bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-all"
                    >
                      Dashboard
                    </Link>
                    <div className="mt-2">
                      <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border border-border shadow-sm" } }}>
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label="Go to Dashboard"
                            labelIcon={<LayoutDashboard className="w-4 h-4" />}
                            href="/dashboard"
                          />
                        </UserButton.MenuItems>
                      </UserButton>
                    </div>
                  </div>
                </Show>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
