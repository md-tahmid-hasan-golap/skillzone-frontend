"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  UserCircle, 
  BarChart, 
  Users, 
  Settings, 
  BookMarked,
  ShieldAlert
} from "lucide-react";

const getLinksForRole = (role) => {
  switch (role) {
    case "admin":
      return [
        { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
        { name: "Analytics", path: "/dashboard/analytics", icon: BarChart },
        { name: "Manage Users", path: "/dashboard/manage-users", icon: Users },
        { name: "Manage Courses", path: "/dashboard/manage-courses", icon: BookMarked },
        { name: "Settings", path: "/dashboard/settings", icon: Settings },
        { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
      ];
    case "manager":
      return [
        { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
        { name: "Reports", path: "/dashboard/reports", icon: BarChart },
        { name: "Users", path: "/dashboard/users", icon: Users },
        { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
      ];
    case "user":
    default:
      return [
        { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
        { name: "My Courses", path: "/dashboard/my-courses", icon: BookOpen },
        { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
      ];
  }
};

const Sidebar = ({ role }) => {
  const pathname = usePathname();
  const links = getLinksForRole(role);

  return (
    <aside className="w-64 h-full bg-card border-r border-border flex flex-col transition-all duration-300 shrink-0">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg leading-none group-hover:scale-110 transition-transform">S</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-foreground">
            SkillZone <span className="text-indigo-500">AI</span>
          </span>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
          {role} Role
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.path;
          const Icon = link.icon;

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20">
          <h4 className="text-sm font-bold text-foreground mb-1">Need Help?</h4>
          <p className="text-[11px] text-muted-foreground mb-3 leading-snug">Check our documentation or contact support.</p>
          <Link href="/contact" className="block text-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg py-2 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
