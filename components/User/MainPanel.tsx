import { UserPreview } from "@/types/apiCalls";
import SubCard from "../Analysis/SubCard";
import { BoostCta } from "../Hero/BoostCta";
import Link from "next/link";
import { Score } from "../Analysis/Score";
import { BoostSummary } from "./BoostSummary";

export const MainPanel: React.FC<{ user: UserPreview }> = ({ user }) => {
  return (
    <div className="mt-4 w-full px-4 lg:w-3/4  xl:mt-0">
      <div className="blog-details blog-details-docs shadow-three dark:bg-gray-dark rounded-sm bg-white lg:mb-5 ">
        {user.resumeBoosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="mb-4 text-center text-3xl font-extrabold text-black dark:text-white lg:mb-6 xl:text-4xl">
              Boost Your First Resume Now
            </h2>
            <BoostCta />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="mb-4 text-4xl font-extrabold text-black dark:text-white">
                My Boosts
              </h2>
              <h5 className="text-xl font-bold ">
                You have {user.resumeBoostsAvailable} / {user.resumeBoostsTotal}{" "}
                Boosts left.
              </h5>
            </div>
            {user.resumeBoosts.map((boost, index) => (
              <SubCard
                className="p-6"
                key={index}
                isFull
                last={index === user.resumeBoosts.length - 1}
              >
                <Score boost={boost} />
                <h6>Summary:</h6>
                <BoostSummary summary={boost.general_feedback.data.feedback} />
                <div className="flex flex-col justify-between pt-4 md:flex-row">
                  <Link href={`/boost/${boost.boostId}`} key={index}>
                    <button className="inline-flex rounded-full bg-primary px-4 py-1 font-semibold text-white duration-300 ease-in-out hover:bg-blackho dark:bg-primary dark:hover:bg-blackho">
                      View Full Feedback
                    </button>
                  </Link>
                  <p className="self-end">
                    {boost.createdAt?.toLocaleDateString("en-US", {
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
