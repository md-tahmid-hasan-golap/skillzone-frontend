"use client";

import React, { useState, useEffect } from "react";
import { Users, BookOpen, DollarSign, TrendingUp, Download, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock Data
const revenueData = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 6000 },
  { name: "Jun", total: 8000 },
];

const categoryData = [
  { name: "Web Dev", value: 400 },
  { name: "AI & ML", value: 300 },
  { name: "Data Science", value: 300 },
  { name: "Design", value: 200 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"];

const recentActivity = [
  { id: 1, user: "Alex Johnson", course: "Full Stack Mastery", date: "Today", status: "Active" },
  { id: 2, user: "Sarah Smith", course: "AI Fundamentals", date: "Yesterday", status: "Completed" },
  { id: 3, user: "Mike Brown", course: "Advanced React", date: "2 days ago", status: "Pending" },
  { id: 4, user: "Emily Davis", course: "UI/UX Design", date: "3 days ago", status: "Active" },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-foreground">{value}</h3>
      {trend && (
        <p className="text-xs font-medium text-emerald-500 mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </p>
      )}
    </div>
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch with Recharts

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">Monitor your learning and system metrics.</p>
        </div>
        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 w-max">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Users" value="12,345" icon={Users} trend="+12% this month" />
        <StatCard title="Active Courses" value="84" icon={BookOpen} trend="+4 new courses" />
        <StatCard title="Total Revenue" value="$45,231" icon={DollarSign} trend="+8% vs last month" />
        <StatCard title="Page Views" value="1.2M" icon={Eye} trend="+24% traffic increase" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-6">Revenue Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-2">Categories</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-foreground">Recent Enrollments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentActivity.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{item.user}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.course}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      item.status === 'Completed' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
