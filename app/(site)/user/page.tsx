import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserDashboard } from "@/components/User/UserDashboard";
import { trackError } from "@/helper/Monitoring/serverError";
import { fetchUser } from "@/helper/fetchUser";
import { MonitoringErrorTypes } from "@/types/monitoring/errors";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../prisma/client";

export const metadata: Metadata = {
  title: "CVBoost | User",
  description: "This is the User page for CVBoost.",
};

const UserPage = async () => {
  const sessionData = await getServerSession(authOptions);
  const seed = process.env.ENCRYPTION_SEED ? process.env.ENCRYPTION_SEED : "";

  if (!seed) {
    console.log("No seed found");
    redirect("/");
  }
  if (!sessionData?.user?.id) {
    redirect("/auth/signin");
  }

  const wrappedUser = await fetchUser(sessionData?.user?.id, seed);

  if (wrappedUser.error) {
    trackError(
      MonitoringErrorTypes.FETCH_USER_ERROR,
      {
        error: wrappedUser.error,
      },
      sessionData.user.id,
    );
    redirect("/error");
  }
  const subscription = await prisma.subscription.findFirst({
    where: { userId: sessionData.user.id },
  });

  return (
    <>
      {wrappedUser.userPreview && (
        <UserDashboard
          subscription={subscription}
          user={wrappedUser.userPreview}
        />
      )}
    </>
  );
};

export default UserPage;
