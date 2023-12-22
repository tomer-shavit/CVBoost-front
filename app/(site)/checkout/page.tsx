import Pricing from "@/components/Pricing";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Checkout() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="mt-22">
      <Pricing hasHeader={false} />
    </div>
  );
}
