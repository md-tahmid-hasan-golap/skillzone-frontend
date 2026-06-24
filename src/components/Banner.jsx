"use client";

import React, { useState, useEffect } from "react";
// লিংক কাজ করানোর জন্য Next.js এর অফিসিয়াল Link ইম্পোর্ট করা হলো ভাই
import Link from "next/link";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 📝 আপনার AI লার্নিং প্ল্যাটফর্মের সাথে সামঞ্জস্যপূর্ণ প্রিমিয়াম টেক্সট ও লিংক
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
      title: "Advance Your Tech Skills With AI",
      subtitle:
        "Master MERN Stack with real-time AI mentoring and personalized roadmaps.",
      ctaText: "Explore Programs",
      ctaLink: "/courses",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
      title: "Build Production-Ready Full Stack Apps",
      subtitle:
        "Learn clean architecture, secure authentication, and role-based access control.",
      ctaText: "Start Coding",
      ctaLink: "/courses",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200",
      title: "Meet Your 24/7 Smart AI Assistant",
      subtitle:
        "Get instant code debugging support and adaptive learning paths anytime.",
      ctaText: "Meet AI Mentor",
      ctaLink: "/about",
    },
  ];

  // Auto play logic - changes slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[65vh] overflow-hidden bg-gray-900">
      {/* Slides Wrapper */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-[5000ms] ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            {/* Dark Gradient Overlay for Typography Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:bg-gradient-to-b md:from-black/60 md:to-black/30 z-10" />

            {/* Content Area */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 text-left text-white max-w-4xl z-20">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 font-poppins">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg text-gray-300 max-w-xl mb-8">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href={slide.ctaLink}>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-600/30 cursor-pointer">
                    {slide.ctaText}
                  </button>
                </Link>

                <Link href="/about">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm border border-white/20 transition-all cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide
                ? "bg-blue-600 w-6"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center pointer-events-none">
        <span className="text-xs text-white/60 tracking-widest uppercase mb-1">
          Scroll Down
        </span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
