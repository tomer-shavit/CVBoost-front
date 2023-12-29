"use client";
import { InAndUpAnimation } from "@/components/Animations/inAndUp";
import SectionHeader from "@/components/Common/SectionHeader";
import { BoostCta } from "@/components/Hero/BoostCta";
import usePageView from "@/hooks/usePageView";
import { PageNames } from "@/types/monitoring/pageNames";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const Congratulations: React.FC<{}> = ({}) => {
  const { data: session } = useSession();
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  usePageView(PageNames.CONGRATULATIONS, {}, session?.user?.id);
  return (
    <section className="mb-55 mt-10 w-full overflow-hidden px-3 pb-10 pt-35 md:pt-40 xl:pb-12 xl:pt-37.5">
      <SectionHeader
        headerInfo={{
          title: ``,
          subtitle: `Congratulations, You're In!`,
          description: `You've unlocked the key to a standout resume. Start your journey to success by uploading your resume.`,
        }}
      />
      <InAndUpAnimation duration={0.3}>
        <div className="mt-8 flex justify-center">
          <BoostCta cta="Let's Start!" />
        </div>
      </InAndUpAnimation>
    </section>
  );
};
