"use client";
import { getProductVariants } from "@/helper/Payments/fetchProducts";
import { DotsBackground } from "./DotsBackground";
import { PricingCard } from "./PricingCard";
import { PricingHeader } from "./PricingHeader";
import { useEffect, useState } from "react";
import { TLemonSqueezyRequest } from "@/helper/Payments/zod-lemon-squeezy";

const Pricing = () => {
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
        <PricingHeader />
        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <DotsBackground />
          {products ? (
            <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
              {products.data
                .filter((product) => product.attributes.name !== "Default")
                .map((product, index) => (
                  <PricingCard
                    key={index}
                    name={product.attributes.name}
                    price={product.attributes.price}
                    isPopular={product.attributes.name === "Standard"}
                  />
                ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Pricing;
