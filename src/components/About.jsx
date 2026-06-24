"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Shaping the Future of Learning with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              SkillZone AI is dedicated to democratizing tech education. We combine cutting-edge artificial intelligence with industry-standard curriculum to deliver a personalized, highly effective learning roadmap for aspiring developers and professionals.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you are starting from scratch or looking to upskill in MERN Stack, Next.js, or AI integration, our smart ecosystem adapts to your speed, ensuring true mastery of skills.
            </p>

            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group">
                Read our full story
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Visual/Features Box */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Decorative background blurs */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl rounded-[3rem] -z-10" />
            
            <div className="bg-card border border-border p-8 sm:p-10 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-8 relative z-10">
                Why Choose SkillZone AI?
              </h3>
              
              <ul className="space-y-6 relative z-10">
                {[
                  "Automated AI Syllabus & Content Generation tailored to your goals.",
                  "Context-Aware AI Chat Assistant for 24/7 instant learning support.",
                  "Production-quality dynamic charts and Role-Based Dashboards.",
                  "Enterprise-grade architecture and scalable full-stack curriculum."
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
