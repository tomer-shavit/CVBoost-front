import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Analysis from "@/components/Analysis";
import { trackError } from "@/helper/Monitoring/serverError";
import { serverPageView } from "@/helper/Monitoring/serverPageView";
import { fetchBoost } from "@/helper/fetchBoosts";
import { MontioringErrorTypes } from "@/types/monitoring/errors";
import { PageNames } from "@/types/monitoring/pageNames";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const BoostIdPage = async ({ params }) => {
  const sessionData = await getServerSession(authOptions);
  const seed = process.env.ENCRYPTION_SEED ? process.env.ENCRYPTION_SEED : "";

  if (!seed) {
    redirect("/");
  }
  if (!sessionData?.user?.id) {
    redirect("/auth/signin");
  }
  const wrappedBoost = await fetchBoost(
    Number(params.boostId),
    sessionData.user.id,
    seed,
  );

  if (wrappedBoost.error) {
    trackError(
      MontioringErrorTypes.FETCH_BOOST_ERROR,
      {
        error: wrappedBoost.error,
      },
      sessionData.user.id,
    );
    redirect("/error");
  }

  serverPageView(
    PageNames.BOOST_ANALYSIS,
    { boostId: params.boostId },
    sessionData.user.id,
  );
  return (
    <>{wrappedBoost.boost && <Analysis data={wrappedBoost.boost}></Analysis>}</>
  );
};

export default BoostIdPage;
