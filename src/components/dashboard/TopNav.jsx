"use client";

import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Menu, UserCircle, ShieldCheck } from "lucide-react";

// ─── Role badge label config ───────────────────────────────────────────────────
const roleConfig = {
  admin: { label: "Admin", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  manager: { label: "Manager", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  user: { label: "User", className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
};

const TopNav = ({ role, toggleMobileMenu }) => {
  const { user } = useUser();
  const config = roleConfig[role] ?? roleConfig.user;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      {/* Left: Mobile toggle + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-foreground tracking-tight hidden sm:block">
          Dashboard
        </h2>
      </div>

      {/* Right: Role badge + Clerk User Menu */}
      <div className="flex items-center gap-3">
        {/* Live Role Badge */}
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${config.className}`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {config.label}
        </div>

        {/* Greeting */}
        {user && (
          <span className="hidden md:block text-sm text-muted-foreground font-medium">
            Hi, <span className="text-foreground font-semibold">{user.firstName ?? "there"}</span>
          </span>
        )}

        {/* Clerk UserButton — has built-in Profile + Sign Out */}
        <div className="pl-3 border-l border-border flex items-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 border border-border shadow-sm",
                userButtonPopoverCard: "shadow-xl border border-border bg-card",
              },
            }}
          >
            {/* Extra "Dashboard Profile" link injected into Clerk's dropdown */}
            <UserButton.MenuItems>
              <UserButton.Link
                label="Dashboard Profile"
                labelIcon={<UserCircle className="w-4 h-4" />}
                href="/dashboard/profile"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
