import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserDashboard } from "@/components/User/UserDashboard";
import { fetchUser } from "@/helper/fetchUser";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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

  const wrappedUser = await fetchUser(sessionData?.user?.id, seed);
  if (wrappedUser.error) {
    console.log("Error fetching user", wrappedUser.error);
    redirect("/error");
  }

  return (
    <>
      {wrappedUser.userPreview && (
        <UserDashboard user={wrappedUser.userPreview} />
      )}
    </>
  );
};

export default UserPage;
