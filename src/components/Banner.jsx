"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, BrainCircuit, Code2 } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000",
    title: "Advance Your Tech Skills With AI",
    highlight: "AI Mentoring",
    subtitle:
      "Master MERN Stack with real-time AI mentoring and personalized learning roadmaps tailored to you.",
    ctaText: "Explore Programs",
    ctaLink: "/courses",
    icon: <BrainCircuit className="w-4 h-4" />,
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
    title: "Build Production-Ready Full Stack Apps",
    highlight: "SaaS Apps",
    subtitle:
      "Learn clean architecture, secure authentication, and role-based access control.",
    ctaText: "Start Coding",
    ctaLink: "/courses",
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000",
    title: "Meet Your 24/7 Smart AI Assistant",
    highlight: "24/7 Support",
    subtitle:
      "Get instant code debugging support and adaptive learning paths anytime, anywhere.",
    ctaText: "Meet AI Mentor",
    ctaLink: "/about",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // 🛠️ মোবাইল স্ক্রিনে হাইট ৬০ভীএইচ (h-[60vh]) এবং ডেক্সটপে ৬৫ভীএইচ (md:h-[65vh]) করা হলো। min-h ও কমানো হয়েছে যেন ওভারফ্লো না হয়।
    <section className="relative w-full h-[60vh] md:h-[65vh] min-h-[400px] md:min-h-[500px] overflow-hidden bg-slate-950">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt="Slide background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-slate-950/65" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-indigo-600/15 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-violet-600/15 rounded-full blur-[100px] z-10 pointer-events-none" />

      {/* Content Area */}
      <div className="relative z-20 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* মোবাইলের জন্য প্যাডিং টপ এবং মার্জিন অপটিমাইজড ভাই */}
        <div className="max-w-4xl pt-4 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              {/* Badge */}
              <motion.div className="mb-3 md:mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] md:text-sm font-medium text-white shadow-xl">
                <div className="text-indigo-400">
                  {slides[currentSlide].icon}
                </div>
                <span>{slides[currentSlide].highlight}</span>
              </motion.div>

              {/* Title - 🛠️ মোবাইলে টেক্সট সাইজ কমিয়ে text-2xl থেকে স্টার্ট করা হয়েছে যাতে স্ক্রিন ব্রেক না করে */}
              <motion.h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2] mb-3 md:mb-4 font-poppins">
                {slides[currentSlide].title.split(" ").map((word, idx, arr) => (
                  <span
                    key={idx}
                    className={
                      idx >= arr.length - 2
                        ? "bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>

              {/* Subtitle - 🛠️ মোবাইলে টেক্সট সাইজ ছোট করা হয়েছে */}
              <motion.p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 max-w-xl md:max-w-2xl mb-5 md:mb-8 leading-relaxed font-light">
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Buttons - 🛠️ মোবাইলে বাটনগুলো সুন্দর পাশাপাশি ছোট আকারে থাকবে */}
              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="flex-1 sm:flex-initial"
                >
                  <button className="w-full sm:w-auto px-5 md:px-7 py-2.5 md:py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-semibold rounded-full shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-300 flex items-center justify-center gap-1.5 group cursor-pointer">
                    {slides[currentSlide].ctaText}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link href="/about" className="flex-1 sm:flex-initial">
                  <button className="w-full sm:w-auto px-5 md:px-7 py-2.5 md:py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs md:text-sm font-semibold rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide
                ? "w-6 h-1.5 bg-indigo-500"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 right-8 z-30 hidden lg:flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest rotate-90 origin-right translate-x-2 mb-4">
          Scroll
        </span>
        <div className="w-4 h-7 border-2 border-slate-500/40 rounded-full flex justify-center p-0.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 bg-slate-300 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
