"use client";
import { getProductVariants } from "@/helper/Payments/crud";
import { DotsBackground } from "./DotsBackground";
import { PricingCard } from "./PricingCard";
import { PricingHeader } from "./PricingHeader";
import { useEffect, useState } from "react";
import { TLemonSqueezyRequest } from "@/helper/Payments/zod-lemon-squeezy";
import { motion as m } from "framer-motion";
const Pricing: React.FC<{ hasHeader?: boolean }> = ({ hasHeader = true }) => {
  const [products, setProducts] = useState<TLemonSqueezyRequest | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProductVariants("151810");
      setProducts(products);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <PricingHeader hasHeader={hasHeader} />
        <div className="relative mx-auto mt-8 max-w-[1207px] px-4 md:px-8 xl:mt-12 xl:px-0">
          <DotsBackground />
          {products ? (
            <m.div
              initial={{ opacity: 0, y: "15%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              exit={{ opacity: 0, y: "15%" }}
            >
              <div className="flex flex-wrap justify-center gap-7.5  lg:flex-nowrap xl:gap-12.5">
                {products.data
                  .filter((product) => product.attributes.name !== "Default")
                  .map((product, index) => (
                    <PricingCard
                      key={index}
                      variantId={product.id}
                      name={product.attributes.name}
                      featuresDomElementsString={
                        product.attributes.description
                          ? product.attributes.description
                          : ""
                      }
                      price={product.attributes.price}
                      isPopular={product.attributes.name === "Standard"}
                    />
                  ))}
              </div>
            </m.div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Pricing;
