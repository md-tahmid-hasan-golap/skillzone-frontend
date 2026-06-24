import React from 'react';
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Courses from "@/components/Courses";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <Banner />
      <Features />
      <About />
      <Statistics />
      <Courses />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default page;