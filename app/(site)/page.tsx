"use client";
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
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";

export default function Home() {
  usePageView(PageNames.HOME);

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
      <Pricing />
      <CTA />
      {/* <Contact /> */}
      {/* <Blog /> */}
      <ScrollToTop />
      <Footer />
    </main>
  );
}
