import Script from "next/script";

export const CheckoutButton: React.FC<{ varientId: string }> = ({
  varientId,
}) => {
  return (
    <button
      aria-label="Get the Plan button"
      className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
    >
      <a
        href="https://cvboost.lemonsqueezy.com/checkout/buy/1d104fa1-108c-41e5-8ebf-18179a53a9ee?embed=1"
        className="lemonsqueezy-button"
      >
        Buy CVBoost
      </a>
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        onLoad={() =>
          // @ts-ignore
          window.createLemonSqueezy()
        }
        defer
      ></Script>
      {/* <a
        href={`https://cvboost.lemonsqueezy.com/checkout/buy/1d104fa1-108c-41e5-8ebf-18179a53a9ee?embed=1&enabled=${varientId}`}
        className={`lemonsqueezy-button`}
      >
        Get a daily email digest for $5/mo
      </a>
      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        onLoad={() =>
          // @ts-ignore
          window.createLemonSqueezy()
        }
      /> */}
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
  );
};
