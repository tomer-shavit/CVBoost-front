"use client";
import Pricing from "@/components/Pricing";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Checkout() {
  const { data: session } = useSession();
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }
  // usePageView(PageNames.CHECKOUT, {}, session?.user?.id);

  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="mt-22">
      <Pricing hasHeader={false} />
    </div>
  );
}
