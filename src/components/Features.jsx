"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, MessageSquareCode, LineChart, Cpu, Bot } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "AI Smart Mentoring",
    description: "Get personalized learning paths and real-time guidance based on your performance.",
  },
  {
    icon: <MessageSquareCode className="w-8 h-8 text-accent" />,
    title: "Context-Aware Chatbot",
    description: "Debug code instantly with our AI assistant trained on millions of developer queries.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-emerald-500" />,
    title: "Predictive Analytics",
    description: "Track your progress with AI-driven insights that highlight areas for improvement.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-amber-500" />,
    title: "Auto-Grading & Review",
    description: "Submit projects and get instant code reviews, security audits, and best practice tips.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-blue-500" />,
    title: "Content Generation",
    description: "Automatically generate boilerplates, documentation, and tests using NLP.",
  },
  {
    icon: <Bot className="w-8 h-8 text-rose-500" />,
    title: "Voice & Image Support",
    description: "Upload mockups to generate UI code, or use voice commands to control your IDE.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Features = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Core Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Supercharge Your Learning with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our platform leverages state-of-the-art AI to adapt to your learning style, providing instant feedback and an unparalleled educational experience.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
