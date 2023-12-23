import {
  extractFeatureData,
  splitNumber,
} from "@/helper/Payments/paymentsParsing";
import { FaCheck } from "react-icons/fa";
import { CheckoutButton } from "./CheckoutButton";

export const PricingCard: React.FC<{
  variantId: string;
  isPopular?: boolean;
  price: number;
  name: string;
  featuresDomElementsString: string;
}> = ({
  variantId: variantId,
  isPopular,
  price,
  name,
  featuresDomElementsString,
}) => {
  const [integer, decimal] = splitNumber(price);
  const features = extractFeatureData(featuresDomElementsString);
  return (
    <div className="animate_top group relative rounded-lg border border-stroke bg-white p-7.5 shadow-solid-10 dark:border-strokedark dark:bg-blacksection dark:shadow-none md:w-[45%] lg:w-1/3 xl:p-12.5">
      {isPopular && (
        <div className="absolute -right-3.5 top-7.5 -rotate-90 rounded-bl-full rounded-tl-full bg-primary px-4.5 py-1.5 text-metatitle font-medium uppercase text-white">
          popular
        </div>
      )}
      <h4 className="mb-4 text-2xl font-normal text-black dark:text-white">
        {name}
      </h4>
      <div className="mb-8 flex flex-row items-end">
        <h3 className="relative w-fit text-5xl font-bold  text-black dark:text-white ">
          ${integer}
          <span className="ri absolute right-[-23px] top-[2px] text-base">
            {decimal}
          </span>
        </h3>
        <span className="dark:text-manate ml-6 text-regular text-waterloo md:ml-5">
          /month
        </span>
      </div>

      <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
        <ul>
          {features.map((feature, index) => (
            <li key={index} className="mb-4  flex items-center last:mb-0 ">
              <FaCheck className="mr-2 text-blue-500 dark:text-blue-400" />
              <p className="text-black dark:text-manatee">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <CheckoutButton variantId={variantId} />
    </div>
  );
};
