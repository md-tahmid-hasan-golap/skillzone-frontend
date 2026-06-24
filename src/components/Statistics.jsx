"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "50+", label: "AI-Powered Courses" },
  { value: "94%", label: "Success Rate" },
  { value: "24/7", label: "Smart Support" },
];

const Statistics = () => {
  return (
    <section className="py-16 bg-background relative z-10 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="space-y-2"
            >
              <h4 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </h4>
              <p className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
