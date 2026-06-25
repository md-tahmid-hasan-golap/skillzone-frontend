"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu, UserCircle } from "lucide-react";

const TopNav = ({ role, setRole, toggleMobileMenu }) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      
      {/* Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-foreground tracking-tight hidden sm:block">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Temporary Role Switcher for Testing */}
        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border">
          <span className="text-xs font-medium text-muted-foreground hidden sm:inline-block">Simulate Role:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Clerk User Profile */}
        <div className="pl-4 border-l border-border flex items-center gap-3">
          <UserButton 
            afterSignOutUrl="/"
            appearance={{ 
              elements: { 
                userButtonAvatarBox: "w-9 h-9 border border-border shadow-sm",
                userButtonPopoverCard: "shadow-xl border border-border bg-card"
              } 
            }}
          >
            {/* Custom Link to our Dashboard Profile Page */}
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
