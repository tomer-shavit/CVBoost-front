import { UserPreview } from "@/types/apiCalls";
import { MainPanel } from "./MainPanel";
import SidebarLink from "./SidebarLink";
import prisma from "@/prisma/client";

export const UserDashboard: React.FC<{ user: UserPreview }> = async ({
  user,
}) => {
  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
  });
  return (
    <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/4">
            <div className="sticky top-[74px] rounded-lg border border-white p-4 shadow-solid-4  transition-all  dark:border-strokedark dark:bg-blacksection">
              <ul className="space-y-2">
                <SidebarLink
                  manageSubscriptionUrl={subscription?.customerPortalUrl}
                />
              </ul>
            </div>
          </div>

          <MainPanel user={user} />
        </div>
      </div>
    </section>
  );
};
