import React from "react";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export const metadata = {
  title: "Dashboard - SkillZone AI",
  description: "Manage your SkillZone AI account.",
};

export default function DashboardLayout({ children }) {
  return (
    <DashboardWrapper>
      {children}
    </DashboardWrapper>
  );
}
