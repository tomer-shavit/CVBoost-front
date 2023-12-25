import { UserPreview } from "@/types/apiCalls";
import SubCard from "../Analysis/SubCard";
import { BoostCta } from "../Hero/BoostCta";
import Link from "next/link";
import { Score } from "../Analysis/Score";
import { BoostSummary } from "./BoostSummary";

export const MainPanel: React.FC<{ user: UserPreview }> = ({ user }) => {
  return (
    <div className="mt-4 w-full px-4 lg:w-3/4  xl:mt-0">
      <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white px-2 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
        {user.resumeBoosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h2>Boost Your First Resume Now</h2>
            <BoostCta />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="mb-4 text-4xl font-extrabold text-black dark:text-white">
                My Boosts
              </h2>
              <h5 className="text-xl font-bold ">
                You have {user.resumeBoostsAvailable - user.resumeBoosts.length}{" "}
                / {user.resumeBoostsAvailable} Boosts left.{" "}
              </h5>
            </div>
            {user.resumeBoosts.map((boost, index) => (
              <SubCard
                className="p-6"
                key={index}
                last={index === user.resumeBoosts.length - 1}
              >
                <Score boost={boost} />
                <h6>Summary:</h6>
                <BoostSummary summary={boost.summary.data.feedback} />
                <div className="flex flex-col justify-between pt-4 md:flex-row">
                  <Link href={`/boost/${boost.boostId}`} key={index}>
                    <button className="mb-3 text-lg text-blackho dark:text-white md:mb-0">
                      Click here for full feedback
                    </button>
                  </Link>
                  <p className="self-end">
                    {boost.created_at?.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </SubCard>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
