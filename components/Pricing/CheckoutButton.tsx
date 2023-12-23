"use client";

import { createCheckoutLink } from "@/helper/Payments/paymentsParsing";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CheckoutButton: React.FC<{ variantId: string }> = ({
  variantId,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [checkoutLink, setCheckoutLink] = useState("");

  useEffect(() => {
    if (session) {
      const link = createCheckoutLink(
        variantId,
        session.user?.email,
        session.user?.id,
      );
      setCheckoutLink(link);
    }
  }, [session, variantId]);

  const handleCheckout = () => {
    if (!session) {
      // Redirect to sign-in and then back to this page
      signIn("credentials", { callbackUrl: "/checkout" });
    } else {
      // Redirect to checkout link
      router.push(checkoutLink);
    }
  };

  return (
    <button
      aria-label="Get the Plan button"
      className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
      onClick={handleCheckout}
    >
      Buy CVBoost
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
