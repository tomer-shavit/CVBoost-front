"use client";
import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// export const metadata: Metadata = {
//   title: "CVBoost | Boost Your Resume With AI.",
//   description: "Improve Your Resume Using AI - Shortcut to Your Dream Job",
//   keywords: "CVBoost, Resume, AI, Job, Career, Interview, CV, Curriculum Vitae",
// };

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Feature />
      {/* <About /> */}
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      <Testimonial />
      <FAQ />
      {/* <Pricing /> */}
      <CTA />
      {/* <Contact /> */}
      {/* <Blog /> */}
      <ScrollToTop />
      <Footer />
    </main>
  );
}
