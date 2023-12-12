"use client";
import React from "react";
import featuresData from "./featuresData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";

const Feature = () => {
  return (
    <>
      <section id="features" className="py-14 lg:py-16 xl:py-18">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "CVBoost Features",
              subtitle: "Stand Out From The Crowd",
              description: `Discover how CVBoost transforms your job application process. Our cutting-edge AI analyzes your resume, providing tailored feedback for impactful improvements. 
             ensuring your CV stands out.`,
            }}
          />
          <div className="mt-12 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:mt-16 xl:gap-12.5">
            {featuresData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
