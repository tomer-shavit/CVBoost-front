import { splitNumber } from "@/helper/price";

export const PricingCard: React.FC<{
  isPopular?: boolean;
  price: number;
  name: string;
}> = ({ isPopular, price, name }) => {
  const [integer, decimal] = splitNumber(price);

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
      <p>Lorem ipsum dolor sit amet, consec adipisicing elit.</p>

      <div className="mt-9 border-t border-stroke pb-12.5 pt-9 dark:border-strokedark">
        <ul>
          <li className="mb-4 text-black last:mb-0 dark:text-manatee">
            300 GB Storage
          </li>
          <li className="mb-4 text-black last:mb-0 dark:text-manatee">
            Unlimited Photos and Videos
          </li>
          <li className="mb-4 text-black opacity-40 last:mb-0 dark:text-manatee">
            Exclusive Support
          </li>
          <li className="mb-4 text-black opacity-40 last:mb-0 dark:text-manatee">
            Custom Branding Strategy
          </li>
        </ul>
      </div>

      <button
        aria-label="Get the Plan button"
        className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
      >
        <span className="duration-300 group-hover/btn:pr-2">Get the Plan</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};
