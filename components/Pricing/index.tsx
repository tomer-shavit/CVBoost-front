import { getProductVariants } from "@/helper/Payments/fetchProducts";
import { DotsBackground } from "./DotsBackground";
import { PricingCard } from "./PricingCard";
import { PricingHeader } from "./PricingHeader";

const Pricing = async () => {
  // const products = await getProductVariants("1");
  // console.log(products);
  return (
    <>
      <section className="overflow-hidden pb-20 pt-15 lg:pb-25 xl:pb-30">
        <PricingHeader />
        {/* <button
          onClick={async () => {
            const products = await getProductVariants("1");
            console.log(products);
          }}
        >
          fetch
        </button> */}
        <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
          <DotsBackground />
          <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
            <PricingCard />
            <PricingCard isPopular />
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
