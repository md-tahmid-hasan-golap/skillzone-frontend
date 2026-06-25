import React from 'react';
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import LatestSkills from "@/components/LatestSkills";
import CTA from "@/components/CTA";

const page = () => {
  return (
    <main className="min-h-screen bg-background">
      <Banner />
       {/* <Courses /> */}
       <LatestSkills />

      <Features />
      <About />
      <Statistics />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default page;