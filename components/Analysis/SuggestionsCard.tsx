"use client";
import { BoostResponse } from "../../types/apiCalls";
import OldLine from "./OldLine";
import NewLine from "./NewLine";
import { HiOutlineSparkles } from "react-icons/hi";
import SubCard from "./SubCard";
import Card from "./Card";
import { Like } from "./Like";

const SuggestionsCard: React.FC<{ data: BoostResponse }> = ({ data }) => {
  return (
    <Card>
      <h5 className="mb-8 flex items-center text-3xl font-extrabold leading-tight text-blackho dark:text-white">
        <span className="mr-2 mt-1 inline-block">
          <HiOutlineSparkles />{" "}
        </span>
        Suggestions:
      </h5>
      {data.edited_lines.map((line, index) => {
        return (
          <SubCard
            className="pb-3"
            last={index === data.edited_lines.length - 1}
            key={index}
          >
            <OldLine text={line.data.old_line}></OldLine>
            <NewLine text={line.data.new_line}></NewLine>
            <Like
              boostId={data.boostId}
              isLiked={line.isLiked}
              feedbackId={line.feedbackId}
              className="noSelect flex w-full select-none justify-end pt-2"
            />
          </SubCard>
        );
      })}
    </Card>
  );
};

export default SuggestionsCard;
