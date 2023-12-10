"use client";
import React from "react";
import { motion } from "framer-motion";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const getTotalWidth = (brandData) => {
  return brandData.reduce((total, brand) => {
    const width = parseInt(brand.width, 10);
    return total + width;
  }, 0);
};

const Brands = () => {
  // Duplicate the brand data for a seamless loop
  const duplicatedBrandData = [...brandData, ...brandData];

  // Calculate the total width of the original brand data
  const singleSetWidth = getTotalWidth(brandData);

  const marqueeVariants = {
    animate: {
      x: [-singleSetWidth, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: singleSetWidth / 25, // Adjust for desired speed
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
      <div className="mx-auto max-w-c-1390 overflow-hidden px-4 md:px-8 2xl:px-0">
        <motion.div
          className="grid auto-cols-max grid-flow-col items-center gap-7.5 md:gap-12.5 xl:gap-29"
          variants={marqueeVariants}
          animate="animate"
        >
          {duplicatedBrandData.map((brand, index) => (
            <SingleBrand brand={brand} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
