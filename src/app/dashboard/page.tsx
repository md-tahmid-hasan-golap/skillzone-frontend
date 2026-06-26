"use client";

import React, { useState, useEffect } from "react";
import { Users, BookOpen, ShieldCheck, TrendingUp, Download, Eye, Loader2 } from "lucide-react";
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
  Legend,
} from "recharts";
import { useDashboardAnalytics } from "@/hooks/useDashboardAnalytics";
import RoleGuard from "@/components/dashboard/RoleGuard";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#10b981", "#3b82f6"];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
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

  const { useOverviewData, useChartData, useTableData } = useDashboardAnalytics();

  const { data: overview, isLoading: overviewLoading } = useOverviewData();
  const { data: charts, isLoading: chartsLoading } = useChartData();
  const { data: tablePayload, isLoading: tableLoading } = useTableData(1, 10);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (overviewLoading || chartsLoading || tableLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const revenueData = charts?.revenueData || [];
  const categoryData = charts?.categoryData || [];
  const recentActivity = tablePayload?.items || [];

  return (
    <RoleGuard allowedRoles={["admin", "manager", "user"]}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Overview</h1>
            <p className="text-sm text-muted-foreground">
              Monitor your learning and system metrics.
            </p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-2 w-max">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <StatCard
            title="Total Users"
            value={overview?.totalUsers || 0}
            icon={Users}
            trend="Active Platform Members"
          />
          <StatCard
            title="Active Courses"
            value={overview?.totalSkills || 0}
            icon={BookOpen}
            trend="Total Published Courses"
          />
          <StatCard
            title="Total Admins"
            value={overview?.totalAdmins || 0}
            icon={ShieldCheck}
            trend="Platform Administrators"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm lg:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-6">User Registration Growth</h3>
            <div className="h-[300px] w-full">
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  No chart data available.
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-2">Skill Categories</h3>
            <div className="h-[300px] w-full">
              {categoryData.length > 0 ? (
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
                      {categoryData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  No category data available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold text-foreground">Recent User Registrations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">User Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentActivity.map((item: any, i: number) => (
                  <tr key={item._id || i} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{item.name || "N/A"}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          item.role === "admin"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : item.role === "manager"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        }`}
                      >
                        {item.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}
                    </td>
                  </tr>
                ))}
                {recentActivity.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
