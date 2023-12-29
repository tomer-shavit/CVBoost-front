"use client";
import { InAndUpAnimation } from "@/components/Animations/inAndUp";
import SectionHeader from "@/components/Common/SectionHeader";
import { BoostCta } from "@/components/Hero/BoostCta";

export const Congratulations: React.FC<{}> = ({}) => {
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
