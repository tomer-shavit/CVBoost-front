import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Analysis from "@/components/Analysis";
import { trackError } from "@/helper/Monitoring/serverError";
import { serverPageView } from "@/helper/Monitoring/serverPageView";
import { fetchBoost } from "@/helper/fetchBoosts";
import { MonitoringErrorTypes } from "@/types/monitoring/errors";
import { PageNames } from "@/types/monitoring/pageNames";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Properly type the params
interface BoostIdPageProps {
  params: Promise<{
    boostId: string;
  }>;
}

const BoostIdPage = async ({ params }: BoostIdPageProps) => {
  // Explicitly await params before destructuring
  const resolvedParams = await params;
  const boostId = resolvedParams.boostId;

  const sessionData = await getServerSession(authOptions);
  const seed = process.env.ENCRYPTION_SEED ? process.env.ENCRYPTION_SEED : "";

  if (!seed) {
    redirect("/");
  }
  if (!sessionData?.user?.id) {
    redirect("/auth/signin");
  }

  const wrappedBoost = await fetchBoost(
    Number(boostId), // Use the awaited boostId
    sessionData.user.id,
    seed,
  );

  if (wrappedBoost.error) {
    trackError(
      MonitoringErrorTypes.FETCH_BOOST_ERROR,
      {
        error: wrappedBoost.error,
      },
      sessionData.user.id,
    );
    redirect("/error");
  }

  // Ensure serverPageView is properly typed for async environment
  await serverPageView(
    PageNames.BOOST_ANALYSIS,
    { boostId }, // Use the awaited boostId
    sessionData.user.id,
  );

  return (
    <>{wrappedBoost.boost && <Analysis data={wrappedBoost.boost}></Analysis>}</>
  );
};

export default BoostIdPage;
