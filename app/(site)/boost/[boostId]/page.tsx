import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Analysis from "@/components/Analysis";
import { fetchBoost } from "@/helper/fetchBoosts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const BoostIdPage = async ({ params }) => {
  const sessionData = await getServerSession(authOptions);
  const seed = process.env.ENCRYPTION_SEED ? process.env.ENCRYPTION_SEED : "";

  if (!seed) {
    console.log("No seed found");
    redirect("/");
  }
  const wrappedBoost = await fetchBoost(
    Number(params.boostId),
    sessionData?.user?.id,
    seed,
  );

  if (wrappedBoost.error) {
    console.log("Error fetching boost", wrappedBoost.error);
    redirect("/error");
  }

  return (
    <>{wrappedBoost.boost && <Analysis data={wrappedBoost.boost}></Analysis>}</>
  );
};

export default BoostIdPage;
