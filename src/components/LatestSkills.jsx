"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import CoursesCard from "@/components/CoursesCard";

const LatestSkills = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: latestSkills = [], isLoading } = useQuery({
    queryKey: ["latestSkills"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latestSkills");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight font-poppins text-foreground sm:text-3xl">
          Explore Our Latest Programs
        </h2>
        <p className="text-sm text-muted-foreground mt-1 font-light">
          Advance your capabilities with recently compiled specialized
          technology tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestSkills.map((skill) => (
          <CoursesCard key={skill._id || skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default LatestSkills;
